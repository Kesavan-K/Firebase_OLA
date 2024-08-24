// src/config/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection,doc, addDoc , getDoc, getDocs, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMijkIFcS5OVKNeZZCQQ4F9-7PRu_m9-g",
  authDomain: "olabase-994f6.firebaseapp.com",
  projectId: "olabase-994f6",
  storageBucket: "olabase-994f6.appspot.com",
  messagingSenderId: "366646463754",
  appId: "1:366646463754:web:cd7482face4e1ac8b53ef3",
  measurementId: "G-XCKF8D16TH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// Export Firebase Authentication methods and Firestore
export {
  auth,
  provider,
  db,
  doc,
  setDoc,
  storage,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
};
// Function to set up metadata
