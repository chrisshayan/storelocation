def get_db_config():
    return {
        'username': 'mongo_atlas_username',
        'password': 'mongo_atlas_password',
        'connection_string': 'mongodb+srv://dbname.mongodb.net/collection?retryWrites=true&w=majority'
    }


def get_gmaps_config():
    return {'api_key': 'google_maps_api_key'}
