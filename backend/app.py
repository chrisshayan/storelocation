from api.place import Place
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json


# Initialize Flask app
app = Flask(__name__, instance_relative_config=True)
if(os.environ.get('FLASK_ENV') == 'development'):
    CORS(app)

# Initialize place
place = Place()


@app.route('/api/place/autocomplete', methods=['POST'])
def autocomplete():
    predictions = []
    input = request.get_json().get('input')
    predictions = place.autocomplete(input)
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

    search_result = place.search(
        query=query, radius=radius, place_type=place_type, opennow=opennow)
    if(search_result):
        return jsonify(search_result)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
