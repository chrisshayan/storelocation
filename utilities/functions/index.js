const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

exports.collectPlaces = functions.database.ref('places/conditions/{conditionsId}')
  .onCreate((snapshot, context) => {
    console.log('doc_id: ', context.params.conditionsId)
    console.log('snapshot', snapshot.val())
    console.log('call collect places with these conditions')
    return snapshot.ref.update({ status: 'running' })
  })
