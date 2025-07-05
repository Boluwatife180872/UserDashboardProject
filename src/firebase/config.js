// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export const auth = getAuth(app);
