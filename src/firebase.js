import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClD1lfxlfbI8fWSMgrliW6tyqr0MIQKZw",
  authDomain: "pickup-sports-7ec88.firebaseapp.com",
  projectId: "pickup-sports-7ec88",
  storageBucket: "pickup-sports-7ec88.firebasestorage.app",
  messagingSenderId: "200257087307",
  appId: "1:200257087307:web:d48e51c756a54f998aeace"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
export const auth = getAuth(app);