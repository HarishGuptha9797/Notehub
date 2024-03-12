import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWSrW-GybSvshr6ioOZCJqdKT8UuMpASU",
  authDomain: "mynotes-2fbb1.firebaseapp.com",
  projectId: "mynotes-2fbb1",
  storageBucket: "mynotes-2fbb1.appspot.com",
  messagingSenderId: "685211054145",
  appId: "1:685211054145:web:0c72f882b89394ecc916c0",
  measurementId: "G-M3BPBZQ3HC",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
