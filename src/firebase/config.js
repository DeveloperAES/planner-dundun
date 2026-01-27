import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZv4dFC0sFJA2R9xTAEg1QonVlIyLLvp0",
    authDomain: "planner-pareja.firebaseapp.com",
    projectId: "planner-pareja",
    storageBucket: "planner-pareja.firebasestorage.app",
    messagingSenderId: "201999681435",
    appId: "1:201999681435:web:e5ca3829b723e31b05c33e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
