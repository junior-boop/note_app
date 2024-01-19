// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsU107hNc1i4XoHwX4GpnHHa2KL_vdrgU",
  authDomain: "note-bible.firebaseapp.com",
  projectId: "note-bible",
  storageBucket: "note-bible.appspot.com",
  messagingSenderId: "181618512922",
  appId: "1:181618512922:web:82bacec1e7d60292e1eda3",
  measurementId: "G-9X9SZ8HNW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const analytics = getAnalytics(app);
export const auth = getAuth(app)