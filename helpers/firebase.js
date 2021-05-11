import firebase from "firebase";
const admin = require("firebase-admin");
// export GOOGLE_APPLICATION_CREDENTIALS='/Users/kerteszkaroly/Documents/next-events-309cd-05ba5a4bdaef.json';
const serviceAccount = require("../service/next-events-309cd-05ba5a4bdaef.json");
// process.env.GOOGLE_APPLICATION_CREDENTIALS
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DB_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: "next-events-309cd.appspot.com",
//     messagingSenderId: process.env.FIREBASE_MASSAGE_ID,
//     appId: process.env.FIREBASE_APP_ID,
//   });
// }

let config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "next-events-309cd.appspot.com",
  messagingSenderId: process.env.FIREBASE_MASSAGE_ID,
  appId: process.env.FIREBASE_APP_ID,
};
// !firebase.apps.length && firebase.initializeApp(config);
// module.exports = firebase;
// admin.initializeApp({
//   databaseURL: process.env.FIREBASE_DB_URL,
//   credential: admin.credential.cert(serviceAccount),
// });
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://next-events-309cd-default-rtdb.firebaseio.com",
  });
}
// if (admin.apps.length === 0) {
//   admin.initializeApp();
// }

// export const auth = admin.auth();
export const auth = firebase.auth();
export const db = admin.firestore();
export const adminAuth = admin.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
// export const googleAuth = firebase.app;
// export const adminUser = admin.auth();

// export const ad = admin;
// export const db = firebase.firestore();
// console.log(admin);
export default function FirebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
