import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyDeecXLsYe2ENSuQLY-VOVBQucXL3FCcyw",
  authDomain: "wattch-b085c.firebaseapp.com",
  projectId: "wattch-b085c",
  storageBucket: "wattch-b085c.firebasestorage.app",
  messagingSenderId: "950450079114",
  appId: "1:950450079114:web:bbadc1d7261399a60eb473",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
