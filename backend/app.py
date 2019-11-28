from api.place import Place
from api.email import Email
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json


# Initialize Flask app
app = Flask(__name__, instance_relative_config=True)
if(os.environ.get('FLASK_ENV') == 'development'):
    CORS(app)

# Initialize place
place_service = Place()
email_service = Email()


@app.route('/api/place/autocomplete', methods=['POST'])
def autocomplete():
    predictions = []
    input = request.get_json().get('input')
    predictions = place_service.autocomplete(input)
    if(predictions):
        return jsonify(predictions)

    return jsonify(predictions)


@app.route('/api/place/search', methods=['POST'])
def search():
    result = {}
    query = request.get_json().get('query')
    radius = request.get_json().get('radius')
    place_type = request.get_json().get('type')
    opennow = request.get_json().get('opennow')

    search_result = place_service.search(
        query=query, radius=radius, place_type=place_type, opennow=opennow)
    if(search_result):
        return jsonify(search_result)

    return jsonify(result)


@app.route('/api/place/collect', methods=['POST'])
def add_place_collection():
    response = {'id': ''}

    conditions = request.get_json().get('conditions')
    email = request.get_json().get('email')
    id = request.get_json().get('id')

    collection_id = place_service.collect_places(conditions, email, id)
    if collection_id:
        response['id'] = collection_id

    return jsonify(response)


@app.route('/api/place/conditions/add', methods=['POST'])
def add_places_conditions():
    response = {'id': ''}

    conditions = request.get_json().get('conditions')
    email = request.get_json().get('email')

    # collect places information
    conditions_id = place_service.add_places_conditions(conditions, email)
    if conditions_id:
        response['id'] = conditions_id

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0',
            port=int(os.environ.get('PORT', 8080)))
