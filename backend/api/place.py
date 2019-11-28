import googlemaps
from datetime import datetime
import time
import sys
import json
import os
from firebase_admin import credentials, db, firestore, initialize_app, exceptions
from .s3 import AwsS3


class Place:
    """ Place class work with Google Maps Places
    """
    DEFAULT_RADIUS = 50  # Default radius for searching a place is 50 meters
    UNUSED_PLACE_TYPES = []
    CREDIT = 0

    def __init__(self):
        api_key = os.environ.get('gmaps_api_key', 'Gmaps API Key is not set!')
        realtime_db = os.environ.get(
            'realtime_db', 'Firebase Realtime Database is not set!')
        self.gmaps = googlemaps.Client(key=api_key)

        # Initialize Firestore DB
        cred = credentials.Certificate('firestore_key.json')
        initialize_app(
            cred, {'databaseURL': f'https://{realtime_db}.firebaseio.com'})
        self.db = firestore.client()
        self.collection = self.db.collection('places')
        self.places_collection = self.db.collection('places_collection')
        self.places_conditions_collection = db.reference(
            'places/conditions')
        self.s3 = AwsS3()

    def autocomplete(self, input: str, types: list = []):
        try:
            predictions = []
            input_text = input
            # print('input: ', input)
            predictions = self.gmaps.places_autocomplete(
                input_text, types=types, components={'country': 'vn'})
            # print('predictions: ', predictions)

            if(len(predictions) > 0):
                predictions = [{
                    'name': p['description'],
                    'id': p['place_id'],
                    'types': p['types']
                } for p in predictions]
            return predictions
        except:
            print('error: ', sys.exc_info()[0])

    def search(self, query: str, radius: int = 0, place_type: str = None, opennow: bool = None):
        try:
            self.CREDIT = 0
            start = datetime.now()
            place_search_data = {}
            arround = []
            origin_place = {}
            summary = {}

            coordinate = ''
            place_id = ''

            places = []
            nearby = []
            nearby_ids = []
            if(not radius):
                radius = self.DEFAULT_RADIUS
            # print('query: ', query)
            # print('radius: ', radius)

            # Extract place_id
            if(self.is_coordinate(query)):
                places = self.search_place_nearby(
                    location=query, radius=10)
                self.CREDIT += 1
                if(len(places) > 0):
                    place = self.get_highest_matched_place(
                        places, query)
                    if(place):
                        coordinate = place['coordinate']
                        place_id = place['id']
                    else:
                        coordinate = query
                        place_id = places[0]['id']
                else:
                    coordinate = query
            else:
                place_id = query
            # print('origin place_id: ', place_id)

            # Extract Origin Place Detail

            origin_place = self.e_place_detail(place_id=place_id)
            # print('origin place: ', origin_place)
            self.CREDIT += 1
            if(not coordinate):
                coordinate = origin_place.get('coordinate')
            # print('origin coordinate: ', coordinate)

            # Extract all around you information
            nearby = self.e_all_arround(
                coordinate, radius, place_type, opennow)
            # print('all arround', nearby)
            self.CREDIT += 1
            nearby = [n for n in nearby if n['types']
                      [0] != 'route' and n['id'] != place_id]
            if(len(nearby) > 0):
                nearby_ids = [n['id'] for n in nearby]

            arround = [self.e_place_detail(place_id)
                       for place_id in nearby_ids]
            # for testing
            # with open('arround.test.json', encoding='utf8') as file:
            #     arround = json.loads(file.read())

            if(len(arround) > 0):
                summary = self.t_around_summary(arround)

            end = datetime.now()
            duration = end - start
            print('all runtime: ', duration.seconds)

            place_search_data = {
                'origin': origin_place,
                'arround': arround,
                'summary': summary,
                'runtime': str(duration.seconds)
            }
            print('placeSearchData: ', place_search_data)
            print('type runtime', place_search_data.get('runtime'))

            # Save place search data into Firestore
            add_place_search_result = self.add_place_search(place_search_data)
            # print('search id: ', id)

            s3_file_name = end.__str__()
            upload_result = self.s3.upload(s3_file_name, place_search_data)
            if upload_result:
                place_search_data['url'] = f"{upload_result}"

            return place_search_data
        except Exception as e:
            print('search.error: ', e)

    def search_place_nearby(self, **kwargs):
        try:
            # type: str = 'full', location: str = '', radius: int = 0,
            # rank_by: str = None, place_type: str=None, opennow: bool=None
            type = kwargs.get('type')
            location = kwargs.get('location')
            radius = kwargs.get('radius')
            rank_by = kwargs.get('rank_by')
            place_type = kwargs.get('place_type')
            opennow = kwargs.get('opennow')
            places = []
            token = ''
            params = {
                'location': location, 'radius': radius
            }
            if(rank_by):
                params['rank_by'] = rank_by
            if(place_type):
                params['type'] = place_type
            if(opennow):
                params['opennow'] = opennow

            # print('search_place_nearby.params', params)
            nearby = self.gmaps.places_nearby(**params)
            if(nearby['status'] == 'OK'):
                places = [self.t_place_nearby(place)
                          for place in nearby['results']]
                if(type == 'full' and token):
                    if(nearby.get('next_page_token')):
                        token = nearby['next_page_token']
                    while(token):
                        # print('get next result: ', token)
                        time.sleep(2)
                        next_nearby = self.gmaps.places_nearby(
                            page_token=token)
                        if(next_nearby['status'] == 'OK'):
                            next_places = [self.t_place_nearby(
                                place) for place in next_nearby['results']]
                            places = [*places, *next_places]
                            if(next_nearby.get('next_page_token')):
                                token = next_nearby['next_page_token']
                            else:
                                token = ''
            return places

        except Exception as e:
            print('search_place_nearby.error: ', e)

    def e_place_detail(self, place_id: str):
        try:
            place = {}

            # print('get place detail: ', place_id)
            search_place = self.gmaps.place(place_id=place_id)
            # print('result: ', search_place)
            if(search_place['status'] == 'OK'):
                p = search_place['result']
                place = self.t_place_detail(p)

            return place
        except Exception as e:
            print('e_place_detail.error: ', e)

    def e_all_arround(self, coordinate: str, radius: int, place_type: str = None, opennow: bool = None):
        """ Extract all nearby places

        Arguments:
            coordinate {str} -- coordinate of origin place
            radius {int} -- radius around the origin for getting the nearby places

        Returns:
            list -- list of nearby places
        """
        params = {
            'type': 'full',
            'location': coordinate,
            'radius': radius
        }
        if(place_type):
            params['place_type'] = place_type
        if(opennow):
            params['opennow'] = opennow

        # print('params: ', params)
        places = self.search_place_nearby(**params)
        # print('places: ', len(places))

        return places

    def t_place_nearby(self, place):
        """ Transform Data of a Nearby Place

        Arguments:
            place {dict} -- Nearby Place data from search nearby result

        Returns:
            dict -- transformed place data
        """
        # print('t_place_nearby.place', place)
        nearby = {
            'id': place['place_id'],
            'name': place['name'],
            'coordinate': self.coordinate_to_str(place['geometry']['location']),
            'types': place['types']
        }
        return nearby

    def t_place_detail(self, place):
        """ Transform Data of a Place Detail

        Arguments:
            place {dict} -- Place detail from search place detail

        Returns:
            dict -- transformed place detail
        """
        detail = {
            'id': place.get('place_id'),
            'name': place.get('name'),
            'address': place.get('formatted_address'),
            'phone': place.get('international_phone_number') if place.get('international_phone_number')
            else place.get('formatted_phone_number'),
            'price_level': place.get('price_level'),
            'coordinate': self.coordinate_to_str(place.get('geometry')['location']),
            'rating': place.get('rating'),
            'reviews': self.t_place_reviews(place.get('reviews')),
            'types': self.t_place_types(place.get('types')),
            'user_ratings_total': place.get('user_ratings_total'),
            'website': place.get('website')
        }
        return detail

    def t_place_reviews(self, reviews):
        """ Transform Place Reviews Data

        Arguments:
            reviews {list} -- List of reviews

        Returns:
            list -- List of transformed Reviews
        """
        rev = []
        if reviews and len(reviews) > 0:
            rev = [{
                # 'author': r.get('author_name'),
                'rating': r.get('rating'),
                'time': r.get('time'),
                'relative_time': r.get('relative_time_description'),
                # 'text': r.get('text')
            } for r in reviews]
        return rev

    def t_place_types(self, types):
        ty = []
        if(len(types) > 0):
            ty = [t for t in types if t not in [
                'point_of_interest', 'establishment']]
        return ty

    def t_around_summary(self, arround: list):
        summary = {
            'total': len(arround)
        }
        if(len(arround) > 0):
            types = []
            ratings = []
            user_ratings = []
            reviews = []
            # Extract
            for a in arround:
                # rating
                if(a.get('rating')):
                    ratings.append(a['rating'])

                # user_ratings_total
                if(a.get('user_ratings_total')):
                    user_ratings.append(a['user_ratings_total'])

                # types
                if(a.get('types')):
                    ty = a.get('types')
                    if(len(ty) > 0):
                        types = [*types, *ty]

                # reviews
                if(a.get('reviews')):
                    rev = a.get('reviews')
                    if(len(rev) > 0):
                        reviews.append(len(rev))

            # Summary
            # rating
            summary['ratings'] = {
                str(r): ratings.count(r) for r in list(set(ratings))}
            # user_ratings_total
            summary['user_ratings'] = {str(r): user_ratings.count(
                r) for r in list(set(user_ratings))}
            # types
            summary['types'] = {str(ut): types.count(
                ut) for ut in list(set(types))}
            # reviews
            summary['reviews'] = {
                str(r): reviews.count(r) for r in list(set(reviews))}

        return summary

    def add_place_search(self, data):
        try:
            data['searchTime'] = datetime.now()
            return self.collection.add(data)
        except exceptions.FirebaseError as e:
            return f"An Error Occured: {e}"

    def collect_places(self, conditions: list, email: str, id: str):
        try:
            doc_id = ''

            # if email is empty, return empty results
            if not email:
                return doc_id
            # if conditions is empty, return empty results
            if not conditions or len(conditions) == 0:
                return doc_id

            places_data = [self.collect_single_place(
                condition) for condition in conditions]

            if len(places_data) > 0:
                print('places_data: ', len(places_data))
                doc_id = self.add_places_collection(places_data, id)

            return doc_id
        except Exception as e:
            raise e

    def collect_single_place(self, condition: dict):
        try:
            result = self.search(query=condition.get(
                'id'), radius=condition.get('radius'))
            # sleep 1 second after every search, prevent collision of google api limits
            time.sleep(1)
            return result
        except Exception as e:
            print('collect_single_place.exception: ', e)

    def add_places_collection(self, places_data, id: str):
        try:
            data = {'collect_time': datetime.now().__str__(),
                    'places': places_data}
            res = self.places_collection.document(id).set(data)
            return id
        except exceptions.FirebaseError as e:
            return f"An Error Occured: {e}"

    def add_places_conditions(self, conditions: list, email: str):
        try:
            doc = {
                'email': email,
                'conditions': conditions,
                'status': 'waiting',
                'create_time': datetime.now().__str__()
            }
            id = ''
            res = self.places_conditions_collection.push(doc)
            if res and res.key:
                id = res.key
            return id
        except exceptions.FirebaseError as e:
            return f"An Error Occured: {e}"

    def get_highest_matched_place(self, places, coordinate):
        place = [p for p in places if p['coordinate'] == coordinate]
        if(len(place) > 0):
            return place[0]
        return {}

    def is_coordinate(self, text):
        """ Check if a text is a Gmaps Coordinate

        Arguments:
            text {str} -- Text data

        Returns:
            boolean -- True if text is coordinate, otherwise is False
        """
        coor = text.split(',')
        if(len(coor) == 2):
            try:
                c = [float(c) for c in coor]
                return True
            except ValueError:
                return False
        return False

    def coordinate_to_str(self, location):
        coor = [str(loc) for loc in list(location.values())]
        return ",".join(coor)
