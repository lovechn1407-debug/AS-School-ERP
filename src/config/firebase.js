import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC0vetmkTgP7Uag923Ko94yAlLOQS0O5aI",
  authDomain: "erp-site-e3357.firebaseapp.com",
  databaseURL: "https://erp-site-e3357-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "erp-site-e3357",
  storageBucket: "erp-site-e3357.firebasestorage.app",
  messagingSenderId: "178916258009",
  appId: "1:178916258009:web:8eedd1412edde6e3b7cec8",
  measurementId: "G-YEJL7VNCT6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
