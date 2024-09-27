// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBsC4w9f3KCXNCVH7bHbe0w2IuK8xjC5HE",
    authDomain: "docsend-4c492.firebaseapp.com",
    projectId: "docsend-4c492",
    storageBucket: "docsend-4c492.appspot.com",
    messagingSenderId: "90388147468",
    appId: "1:90388147468:web:24608c05c5934fb8476d29",
    measurementId: "G-TYMDPHKGLK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { db, storage,analytics, auth };

//firebase deploy --only hosting:ccagoodcred