// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCTUzS68qMqJGpn1x_dgwFmJWv_ajQOd8",
    authDomain: "mhrc-43549.firebaseapp.com",
    projectId: "mhrc-43549",
    storageBucket: "mhrc-43549.firebasestorage.app",
    messagingSenderId: "9460570613",
    appId: "1:9460570613:web:a09bc322414ef07b8128bc",
    measurementId: "G-BLKNV320LX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
// Initialize Analytics only in the browser
export const analytics =
    typeof window !== "undefined"
        ? getAnalytics(app)
        : null;

export const auth = getAuth(app);

export default app;