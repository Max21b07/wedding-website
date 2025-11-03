// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC40r2bZiVf5Z1rA3RLbesJs7E2ItVUlJM",
  authDomain: "wedding-website-phuongmaxime.firebaseapp.com",
  projectId: "wedding-website-phuongmaxime",
  storageBucket: "wedding-website-phuongmaxime.firebasestorage.app",
  messagingSenderId: "547890773631",
  appId: "1:547890773631:web:79b05dc6da2d3f3797494a",
  measurementId: "G-CSFCF6C4MN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Export for use in other files
window.db = db;
window.firebase = firebase;
