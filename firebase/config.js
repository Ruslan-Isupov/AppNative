import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDq1h4sugAxjHaK0ZaHArtMlPnacSu4jg",
  authDomain: "nativegoit-45f8e.firebaseapp.com",
  projectId: "nativegoit-45f8e",
  storageBucket: "nativegoit-45f8e.appspot.com",
  messagingSenderId: "91258443486",
  appId: "1:91258443486:web:a0055cb9ee020e6f9e544f",
  measurementId: "G-RQG5LJJH96",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
