import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();

exports.notification = functions.https.onCall((message: any, context) => {
    console.log('message recieved: ', message);
    const note = {
        data: { body: message },
        topic: 'relevant'
    }
    return admin.messaging().send(note)
        .then(data => {
            return { message: data }
        })
        .catch(err => {
            console.error('err in sending message: ', err);
            return { error: err }
        });

});
