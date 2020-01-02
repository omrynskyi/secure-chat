import firebase from 'firebase/app';
import 'firebase/firestore';
  
// Initialize Firebase
const config = {
  apiKey: "AIzaSyC3vbGpbIHa39h04tIQPQ9dGTE0osOiaDA",
  authDomain: "chat-test-3d94c.firebaseapp.com",
  databaseURL: "https://chat-test-3d94c.firebaseio.com",
  projectId: "chat-test-3d94c",
  storageBucket: "chat-test-3d94c.appspot.com",
  messagingSenderId: "164560417826",
  appId: "1:164560417826:web:31c84828a03e693a20867b",
  measurementId: "G-9QJWD314NQ"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
  