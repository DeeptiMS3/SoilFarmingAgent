// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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
const db = getDatabase(app);

// Reference to the registration form and button
const registerForm = document.querySelector('.registerform');
const userRegisterbtn = document.getElementById('userRegisterbtn');

// Add event listener to the registration button
userRegisterbtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get user input values
    const email = document.getElementById('useremailInp').value;
    const password = document.getElementById('userpassInp').value;
    const firstName = document.getElementById('userfnameInp').value;
    const lastName = document.getElementById('userlnameInp').value;
    const phone = document.getElementById('phoneInp').value;

    // Create new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            set(ref(db, 'Users/' + user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            }).then(() => {
                alert("User registered successfully!");
                window.location.href = "login.html";
            }).catch((error) => {
                console.error("Error writing user data to Realtime Database:", error);
                alert("Error writing user data. Please try again.");
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        });
});
