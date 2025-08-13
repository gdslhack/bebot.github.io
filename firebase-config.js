// ======================= FIREBASE CONFIG =======================

// Import Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  getDoc, 
  onSnapshot,
  query,
  where,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Import Auth
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDJkbOmOjnKtlDaMS9O7m9e4nJR_yVo2NU",
  authDomain: "bengkel-65049.firebaseapp.com",
  projectId: "bengkel-65049",
  storageBucket: "bengkel-65049.appspot.com",
  messagingSenderId: "1035583732303",
  appId: "1:1035583732303:web:e5fd0a5e62aedc6247883a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Auth
const auth = getAuth(app);

// ======================= EXPORT =======================
export { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  getDoc, 
  onSnapshot,
  query,
  where,
  setDoc,
  auth
};

// ======================= AUTH FUNCTIONS =======================

// Register
export async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error(error.code, error.message);
        throw error;
    }
}

// Login
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error(error.code, error.message);
        throw error;
    }
}

// Logout
export async function logout() {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error(error.code, error.message);
        throw error;
    }
}

// Cek login/logout
export function onAuthChange(callback) {
    onAuthStateChanged(auth, callback);
}
