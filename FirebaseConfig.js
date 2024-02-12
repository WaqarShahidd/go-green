import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaTEjcX4oo2QHUbfQ1dAXRfEchsee6AU8",
  authDomain: "go-green-a0199.firebaseapp.com",
  projectId: "go-green-a0199",
  storageBucket: "go-green-a0199.appspot.com",
  messagingSenderId: "709618388131",
  appId: "1:709618388131:web:5047e2ba9618af9f9cc316",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(FIREBASE_APP);
