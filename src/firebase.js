import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDrbpThV_LTLGASa5dKE0c8M3cPpF-N-J0",
  authDomain: "clue-4a3b8.firebaseapp.com",
  projectId: "clue-4a3b8",
  storageBucket: "clue-4a3b8.appspot.com",
  messagingSenderId: "406241092147",
  appId: "1:406241092147:web:3606403d3595b7d2e33946",
  measurementId: "G-NZ6CLFMNS2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;