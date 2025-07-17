// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtu73xyJrqmOhkWRlnz8MPK_N7MjIYD_E",
  authDomain: "todo-24436.firebaseapp.com",
  projectId: "todo-24436",
  storageBucket: "todo-24436.firebasestorage.app",
  messagingSenderId: "55342352313",
  appId: "1:55342352313:web:eded24c4bf515d53439868",
  measurementId: "G-WK118RFS40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};