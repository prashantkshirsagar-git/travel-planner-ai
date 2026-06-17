// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmjRMfQ8Sms4bEVdSuR4YtYi6qzqyR-II",
  authDomain: "travel-planner-588ea.firebaseapp.com",
  projectId: "travel-planner-588ea",
  storageBucket: "travel-planner-588ea.firebasestorage.app",
  messagingSenderId: "720238819028",
  appId: "1:720238819028:web:9354e34a7fd98fc1b96d41"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);