import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, get, ref, child, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCv9Khr0yLP7NxFmQ7R0h-2QuQ2OW_-2fo",
    authDomain: "soilfarmingagent-d4f1e.firebaseapp.com",
    projectId: "soilfarmingagent-d4f1e",
    storageBucket: "soilfarmingagent-d4f1e.firebasestorage.app",
    messagingSenderId: "663125307766",
    appId: "1:663125307766:web:22271f15324a5059b78a57"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();
const auth = getAuth();
const dbref = ref(db);
const adminName = document.getElementById('adminName');
const SignOutBtn = document.getElementById('SignOutBtn');


onAuthStateChanged(auth, (user) => {
    if (user) {
        get(child(dbref, "Users/" + user.uid))
        adminName.innerHTML = `Hello, ${user.email.split('@')[0]}!`;
    } else {
        window.location.href = "../../admin-login.html";
    }
});

const Logout = () => {
    signOut(auth)
        .then(() => {
            window.location.href = "../../admin-login.html";
        })

}
SignOutBtn.addEventListener('click', Logout);

