// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc,updateDoc, doc, deleteDoc, setDoc, onSnapshot  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTk4QCS_a2lcnhoYj1gJgfTcOiU_Lmhyo",
  authDomain: "interview-14175.firebaseapp.com",
  projectId: "interview-14175",
  storageBucket: "interview-14175.firebasestorage.app",
  messagingSenderId: "587436820625",
  appId: "1:587436820625:web:1007e7e8dc179930565730",
  measurementId: "G-GF4REQ2LMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, doc, deleteDoc,updateDoc, setDoc, onSnapshot  };