// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyA7c_ZkU1C5zP59mLLlUIGZGfkIMQuO4BU",
  authDomain: "collab-platform-384a2.firebaseapp.com",
  projectId: "collab-platform-384a2",
  storageBucket: "collab-platform-384a2.appspot.com",
  messagingSenderId: "123003157074",
  appId: "1:123003157074:web:211390b40b0cb238c1fd8b",
  measurementId: "G-6G1R8JGWZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
