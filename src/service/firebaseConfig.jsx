
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-planner-588ea.firebaseapp.com",
  projectId: "travel-planner-588ea",
  storageBucket: "travel-planner-588ea.firebasestorage.app",
  messagingSenderId: "720238819028",
  appId: "1:720238819028:web:9354e34a7fd98fc1b96d41"
};


export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);