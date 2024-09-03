// Import the functions you need from the SDKs you need
import { initializeApp,initializeAuth } from "firebase/app";
import {getAuth} from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMbKq3IvFkP9YMIKHGaMRYXrBRuUVX1gQ",
  authDomain: "food-app-cc2ff.firebaseapp.com",
  projectId: "food-app-cc2ff",
  storageBucket: "food-app-cc2ff.appspot.com",
  messagingSenderId: "342538683958",
  appId: "1:342538683958:web:af8242486354f92d4dba97"
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth_firebase = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export const db = getFirestore(app);
