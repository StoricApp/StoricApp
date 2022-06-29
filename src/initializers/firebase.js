import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAes-a8uWmNZyCAoSMwevBmZIjKcnAtzXM",
  authDomain: "storic-app-prod.firebaseapp.com",
  projectId: "storic-app-prod",
  storageBucket: "storic-app-prod.appspot.com",
  messagingSenderId: "691489754588",
  appId: "1:691489754588:web:4a95bdad0b3f2a3b861319",
  measurementId: "G-55Y74SG3LT"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

