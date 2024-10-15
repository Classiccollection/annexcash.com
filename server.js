// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// Add any additional Firebase SDKs that you plan to use
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9NdDm3P26coUMtvQ_Rs88ylZX6tu_968",
    authDomain: "annex-cash.firebaseapp.com",
    projectId: "annex-cash",
    storageBucket: "annex-cash.appspot.com",
    messagingSenderId: "787593405771",
    appId: "1:787593405771:web:80e357dcc861741b7fb4ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
