// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA_HIWlGDbSp-AkST317iyZN0DNE2BecGQ",
  authDomain: "fir-feb68.firebaseapp.com",
  projectId: "fir-feb68",
  storageBucket: "fir-feb68.appspot.com",
  messagingSenderId: "472495622973",
  appId: "1:472495622973:web:35bbf25ebe37e4b79a5354",
  measurementId: "G-1PK3Y51LRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;