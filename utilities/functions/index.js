const functions = require('firebase-functions');
const admin = require('firebase-admin')
const rp = require('request-promise')
const _ = require('underscore')
const sgMail = require('@sendgrid/mail');

admin.initializeApp()

exports.collectPlaces = functions.database.ref('places/conditions/{conditionsId}')
  .onCreate(async (snapshot, context) => {
    let collectionId = ''
    const conditionsId = context.params.conditionsId
    const { conditions, email } = snapshot.val()

    // console.log('doc_id: ', conditionsId)
    // console.log('snapshot', conditions)
    // console.log('email', email)

    try {
      const options = {
        method: 'POST',
        uri: `${functions.config().storelocation.api_uri}/api/place/collect`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: { conditions: conditions.map(c => JSON.parse(c)), email, id: conditionsId },
        json: true // Automatically parses the JSON string in the response
      };


      snapshot.ref.update({ status: 'running' })
      const collectResult = await rp(options)
      // console.log('places: ', collectResult)

      // send email 
      if (!_.isEmpty(collectResult)) {
        const { id } = collectResult
        if (!_.isEmpty(id)) {
          await sendMail(email, '', { id })
        }
      }

      snapshot.ref.update({ status: 'finished' })
    } catch (err) {
      console.log('error: ', err.message)
    }
    return collectionId
  })

const sendMail = async (emailAddress, template, content) => {
  try {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(functions.config().sendgrid.api_key);
    const msg = {
      to: emailAddress,
      from: 'StoreLocation <mekongcapitalmap@gmail.com>',
      subject: 'Your places collection is ready',
      html: `<strong>Visit <a href="${functions.config().storelocation.api_uri}/collection/${content.id}">here</a> to view the Collection of Places Information that you requested.</strong>`,
    };
    sgMail.send(msg);
  } catch (err) {
    console.log('sendMail.error: ', err.message)
  }
}
