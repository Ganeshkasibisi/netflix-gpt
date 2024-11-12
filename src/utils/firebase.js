// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAKRtKIP-6zXsU2aFU2ZSiocm99tAZSTQ",
  authDomain: "netflixgpt-83.firebaseapp.com",
  projectId: "netflixgpt-83",
  storageBucket: "netflixgpt-83.firebasestorage.app",
  messagingSenderId: "273610271751",
  appId: "1:273610271751:web:bbea42c901e86994964ea2",
  measurementId: "G-3RNV8VT7ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
