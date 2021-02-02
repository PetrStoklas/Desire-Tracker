const functions = require('firebase-functions');
const admin = require("firebase-admin");
const { createHash } = require("crypto");

admin.initializeApp();

const { firestore } = admin;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// TODO: Put into separated folder helpers
function isAuthProvider(user, providerId) {
    return (
      user.providerData.find((providerData) => providerData.providerId === providerId) !== undefined
    );
}

// TODO: Put into separated folder helpers
const setUserDocument = async (
  userUid,
  name,
  email,
  photoURL,
) => {
    // This is needed for Gravatar
    let trimmedEmail;
    let emailHash;
    if (!photoURL && email) {
        trimmedEmail = email.trim().toLocaleLowerCase();
        emailHash = trimmedEmail ? createHash("md5").update(trimmedEmail).digest("hex") : null;
    }

    const userDoc = firestore().collection("users").doc(userUid);

    // This method is called from addUserToWorkspace and onUserCreated
    // Can cause multiple async calls with same data
    if ((await userDoc.get()).exists) {
        console.log(`No set on User Doc ${userUid} - user already exists`);
        return null;
    }

    return userDoc.set({
        name: name || email ? email.split("@")[0] || `User ${Math.ceil(Math.random() * 1000000)}`: "Unknown name",
        email: email,
        photoURL:
          photoURL ||
          (emailHash &&
            `https://www.gravatar.com/avatar/${emailHash}?s=256&d=https%3A%2F%2Fapi.adorable.io%2Favatars%2F256%2F${emailHash}.png`),
        groups: {},
        owningGroups: 0
    });
}




exports.onUserCreated = functions
  .region("europe-west")
  .auth.user()
  .onCreate(async (user) => {
      if (isAuthProvider(user, "google.com")) {
          return setUserDocument(user.uid, user.displayName, user.email, user.photoURL);
      }
  })
