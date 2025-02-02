// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCv9Khr0yLP7NxFmQ7R0h-2QuQ2OW_-2fo",
    authDomain: "soilfarmingagent-d4f1e.firebaseapp.com",
    projectId: "soilfarmingagent-d4f1e",
    storageBucket: "soilfarmingagent-d4f1e.firebasestorage.app",
    messagingSenderId: "663125307766",
    appId: "1:663125307766:web:22271f15324a5059b78a57"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Reference to the login form and button
const userLoginBtn = document.getElementById('adminLoginBtn');

// Add event listener to the login button
userLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get user input values
    const email = document.getElementById('adminEmailInp').value;
    const password = document.getElementById('adminPasswordInp').value;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "./admin/admin-dashboard.html";
        }
    });

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            alert("Login successful!");
            window.location.href = "./admin/admin-dashboard.html"; // Redirect to a dashboard or home page
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        });
});
