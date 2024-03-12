import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKIBqT9FYNoY-NuLA1WeqLkVVrLGGFG4w",
  authDomain: "abcd-18752.firebaseapp.com",
  projectId: "abcd-18752",
  storageBucket: "abcd-18752.appspot.com",
  messagingSenderId: "104730912932",
  appId: "1:104730912932:web:6aa36e71706e160c74de31",
  measurementId: "G-FN31BNWHTT"
};


  if (!firebase.apps.lenght) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export { firebase };