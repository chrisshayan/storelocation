const functions = require('firebase-functions');
const admin = require('firebase-admin')
const rp = require('request-promise')

admin.initializeApp()

exports.collectPlaces = functions.database.ref('places/conditions/{conditionsId}')
  .onCreate((snapshot, context) => {
    console.log('doc_id: ', context.params.conditionsId)
    console.log('snapshot', snapshot.val())
    console.log('call collect places with these conditions')

    console.log('call backend')
    const options = {
      method: 'POST',
      uri: '',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: { "query": "ChIJwd9IoKarNTERT3C7BsMeOjU", "radius": 50 },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
      .then(res => console.log('response: ', res))
      .catch(err => console.log('error: ', err));

    return snapshot.ref.update({ status: 'running' })
  })
