// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH5hQQ-umEKcyfISQJ-JaM8Bi22Q3VYlk",
  authDomain: "ite-recurrencies.firebaseapp.com",
  projectId: "ite-recurrencies",
  storageBucket: "ite-recurrencies.appspot.com",
  messagingSenderId: "202558768735",
  appId: "1:202558768735:web:fd080d6a7c97259c687dea"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp)
