import firebase from "firebase/app";
import 'firebase/firestore';


let firebaseConfig = {
  apiKey: "AIzaSyC3SGOhfv-uBLMqbzHwoKtMae6Lk5Y6oig",
  authDomain: "boardapp-d6757.firebaseapp.com",
  projectId: "boardapp-d6757",
  storageBucket: "boardapp-d6757.appspot.com",
  messagingSenderId: "40902392514",
  appId: "1:40902392514:web:d523db92771c3184b2595b",
  measurementId: "G-ES3CYTYSTE"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;