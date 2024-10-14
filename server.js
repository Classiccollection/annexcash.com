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
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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

// User Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                alert("Signup successful");
                // Redirect to dashboard or another page
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

// User Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                alert("Login successful");
                // Redirect to dashboard or another page
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

// Staff Login (similar to user login)
const staffLoginForm = document.getElementById('staff-login-form');
if (staffLoginForm) {
    staffLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('staff-email').value;
        const password = document.getElementById('staff-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                alert("Staff login successful");
                // Redirect to staff dashboard or another page
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}
