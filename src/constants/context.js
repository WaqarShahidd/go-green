// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, db } from "../../FirebaseConfig";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const [userDocId, setuserDocId] = useState("");

  const [isAuthenticated, setisAuthenticated] = useState(false);

  const SignIn = async (email, password, type) => {
    setError("");
    if (email === "" || password === "") {
      setError("Please fill all fields");
    } else {
      setloading(true);
      try {
        const response = await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        setloading(false);
        await AsyncStorage.setItem("userId", response.user.uid);
        console.log(response.user);
        setisAuthenticated(true);
        setError("");
      } catch (error) {
        setloading(false);
        console.log(error.message);
        setError(error.message);
      }
    }
  };

  const GetUser = async () => {
    let userID = await AsyncStorage.getItem("userId");
    try {
      const usersCollection = collection(db, "Users");

      const q = query(usersCollection, where("id", "==", userID));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User with the specified id not found.");
        console.log(userID);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userDocId = userDoc.id;
      setuserDocId(userDocId);

      const targetUserDoc = querySnapshot.docs[0].ref;

      const targetUserSnapshot = await getDoc(targetUserDoc);

      const userData = targetUserSnapshot.data();

      setUserData(userData);
      console.log("User data fetched successfully.");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        SignIn,
        loading,
        error,
        GetUser,
        setisAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
