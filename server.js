// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
console.log("Firebase has been initialized", app);
