import firebase from 'firebase/app';
import 'firebase/firestore';
  
// Initialize Firebase

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_PROJECT_ID +".firebaseapp.com",
  databaseURL: "https://" + process.env.VUE_APP_PROJECT_ID + ".firebaseio.com",
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: "" + process.env.VUE_APP_APP_ID,
  measurementId:  process.env.VUE_APP_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
  