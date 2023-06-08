import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByngiXQiE1FU7AVvsYvPc40KksYz3dWDE",
  authDomain: "booking-website-76fbf.firebaseapp.com",
  projectId: "booking-website-76fbf",
  storageBucket: "booking-website-76fbf.appspot.com",
  messagingSenderId: "674244825297",
  appId: "1:674244825297:web:b3928b43230536798bf5f0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
