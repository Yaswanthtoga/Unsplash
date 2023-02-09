import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh3TIctcsnTKUcVMy74YeJvTQtIs9ZZJA",
  authDomain: "unsplash-537b6.firebaseapp.com",
  projectId: "unsplash-537b6",
  storageBucket: "unsplash-537b6.appspot.com",
  messagingSenderId: "306609425988",
  appId: "1:306609425988:web:608135e7b034f64d38b611"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);