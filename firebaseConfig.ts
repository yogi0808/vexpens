import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// @ts-ignoreh
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjQMQlXsSjAGnFDEIdifzOTBbkv75w-1E",
    authDomain: "vexpens-46a71.firebaseapp.com",
    projectId: "vexpens-46a71",
    storageBucket: "vexpens-46a71.firebasestorage.app",
    messagingSenderId: "432651771145",
    appId: "1:432651771145:web:de5bf7ad7ac313d94d47d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

// db
export const firestore = getFirestore(app)