// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9DsA6lGCHfcR60dOU4pD-15AIynKSBqM",
  authDomain: "waco-digital.firebaseapp.com",
  projectId: "waco-digital",
  storageBucket: "waco-digital.appspot.com",
  messagingSenderId: "150225097390",
  appId: "1:150225097390:web:78f181dccdd7af916bd33f",
  measurementId: "G-H6HH62VEFT",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
var providerFB = new firebase.auth.FacebookAuthProvider();

export { db, auth, provider, providerFB };
