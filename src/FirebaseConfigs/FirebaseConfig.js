import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOfHwg-RjgST51uIvO1hhfdSU9ZLpPwZo",
  authDomain: "ecomcem-c93f5.firebaseapp.com",
  projectId: "ecomcem-c93f5",
  storageBucket: "ecomcem-c93f5.appspot.com",
  messagingSenderId: "994959333400",
  appId: "1:994959333400:web:a59d7d1deec24e02d10b6d",
  measurementId: "G-6S82Y0MK1G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
