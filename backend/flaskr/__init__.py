from .collections.places import Places
from .api.place import Place
from flask_cors import CORS
from flask import Flask, request, jsonify
import os
import json


def create_app(test_config=None):
    # Create and Configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.mongo')
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('settings.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # initiate place
    place = Place()

    @app.route('/')
    def index():
        return 'Places backend!'

    @app.route('/place/autocomplete', methods=['POST'])
    def autocomplete():
        predictions = []
        input = request.get_json().get('input')
        predictions = place.autocomplete(input)
        if(predictions):
            return jsonify(predictions)

        return jsonify(predictions)

    @app.route('/place/search', methods=['POST'])
    def search():
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

    return app
