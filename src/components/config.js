// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI6wdGvJgnWRJY2AdQA10VJfwBpvlXoyA",
  authDomain: "user-dashboard-project-884b1.firebaseapp.com",
  projectId: "user-dashboard-project-884b1",
  storageBucket: "user-dashboard-project-884b1.firebasestorage.app",
  messagingSenderId: "605703981087",
  appId: "1:605703981087:web:fb96a7c94b77fe2a222d2a",
  measurementId: "G-S2EJ0LERBT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
