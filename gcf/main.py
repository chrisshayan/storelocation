from api.place import Place
from flask import abort, jsonify


def places(request):
    """ Google Maps Places

    Arguments:
        request {flask.Request} -- The request object. <http://flask.pocoo.org/docs/1.0/api/#flask.Request>
    """
    # initiate place
    place = Place()

    if(request.method == 'POST'):
        path = request.path
        if(path == '/autocomplete'):
            predictions = []
            input = request.get_json().get('input')
            data = place.autocomplete(input)
            if(data):
                predictions = data
            return jsonify(predictions)
        if(path == '/search'):
            result = {}
            query = request.get_json().get('query')
            radius = request.get_json().get('radius')
            place_type = request.get_json().get('type')
            opennow = request.get_json().get('opennow')

            search_result = place.search(
                query=query, radius=radius, place_type=place_type, opennow=opennow)
            if(search_result):
                return jsonify(search_result)

            return jsonify(result)
    else:
        return abort(405)
