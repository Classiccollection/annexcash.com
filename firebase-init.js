// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

// Function to handle user sign-up
async function signUp(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User created successfully!');
    } catch (error) {
        alert('Error signing up: ' + error.message);
    }
}

// Function to handle user login
async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('User logged in successfully!');
    } catch (error) {
        alert('Error logging in: ' + error.message);
    }
}

// Function to handle logout
function logout() {
    signOut(auth).then(() => {
        alert('User logged out successfully!');
        window.location.href = 'index.html'; // Redirect to homepage or login page
    }).catch((error) => {
        alert('Error logging out: ' + error.message);
    });
}

// Function to fetch balance
async function fetchBalance(email) {
    const userDoc = doc(db, 'users', email); // Assuming email is used as the document ID
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        return docSnap.data().balance;
    } else {
        console.log('No such document!');
        return 0;
    }
}

// Function to update balance
async function updateBalance(email, newBalance) {
    const userDoc = doc(db, 'users', email);
    await updateDoc(userDoc, {
        balance: newBalance
    });
}

// Security check to ensure the user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can access their info
        const email = user.email;
        console.log('User is signed in: ', email);
        // Fetch the balance when the user is authenticated
        fetchBalance(email).then(balance => {
            document.getElementById("balance").textContent = balance; // Update the displayed balance
        });
    } else {
        // No user is signed in, redirect to login page
        window.location.href = 'login.html'; // Redirect to login page
    }
});

// Withdrawal function
function confirmWithdrawal() {
    const coinsToWithdraw = document.getElementById("coinsToWithdraw").value;
    const balance = parseInt(document.getElementById("balance").textContent);

    if (isNaN(coinsToWithdraw) || coinsToWithdraw <= 0) {
        alert("Please enter a valid number of coins to withdraw.");
        return;
    }

    if (coinsToWithdraw > balance) {
        alert("You do not have enough coins to withdraw this amount.");
        return;
    }

    const confirmation = confirm(Are you sure you want to withdraw ${coinsToWithdraw} coins? This is equivalent to Ksh ${coinsToWithdraw}.);
    if (confirmation) {
        updateBalance(auth.currentUser.email, balance - coinsToWithdraw).then(() => {
            alert(Withdrawal of ${coinsToWithdraw} coins has been processed!);
            document.getElementById("balance").textContent = balance - coinsToWithdraw;
        });
    }
}

// Staff login function (to restrict access to the staff page)
async function staffLogin(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Check if user is staff
        const userDoc = doc(db, 'staff', email); // Assuming staff data is stored separately
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            alert('Staff logged in successfully!');
            window.location.href = 'staff.html'; // Redirect to staff page
        } else {
            alert('Access denied. You are not a staff member.');
            logout(); // Logout the user if they are not staff
        }
    } catch (error) {
        alert('Error logging in: ' + error.message);
    }
}

// Example usage of the functions
// signUp('user@example.com', 'password'); // Call this when a new user signs up
// login('user@example.com', 'password'); // Call this when a user logs in
// confirmWithdrawal(); // Call this to execute a withdrawa
