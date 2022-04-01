import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzfGyrTOPd4_S0MRyFbpiMVWKRlOpRl60",
  authDomain: "todoapp-813f2.firebaseapp.com",
  databaseURL:
    "https://todoapp-813f2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todoapp-813f2",
  storageBucket: "todoapp-813f2.appspot.com",
  messagingSenderId: "532708203730",
  appId: "1:532708203730:web:bb80d5bec14d58c741610b",
  measurementId: "G-Y054Z4FKQ1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
