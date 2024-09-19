import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAwCl36Vv3RKWm9D-bKy-hmUeBa0Pcw880",
  authDomain: "gym-clube.firebaseapp.com",
  projectId: "gym-clube",
  storageBucket: "gym-clube.appspot.com",
  messagingSenderId: "131365163973",
  appId: "1:131365163973:web:12bbc24de2a2cf76e0b1ac",
  measurementId: "G-YTM5DDXS4C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const  db = getFirestore(app)

export {auth, db}