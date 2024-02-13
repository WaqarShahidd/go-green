import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNzDg88RvqOZrCGgvUz0nSTCShibaz8ZQ",
  authDomain: "go-green-d5130.firebaseapp.com",
  projectId: "go-green-d5130",
  storageBucket: "go-green-d5130.appspot.com",
  messagingSenderId: "922528177285",
  appId: "1:922528177285:web:3b9402398ea3a219d35dec",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(FIREBASE_APP);
