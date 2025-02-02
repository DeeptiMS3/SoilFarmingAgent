import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
const db = getDatabase();
const soilDetailsRef = ref(db, "SoilDetails/");
const distributorDetailsRef = ref(db, "DistributorDetails/");

const totalSoilEntriesElement = document.getElementById("totalSoilEntries");
const totalDistributorEntriesElement = document.getElementById("totalDistributorEntries");

let totalSoilEntries = 0;
let totalDistributorEntries = 0;

// Fetch and display soil details
const displaySoilDetails = () => {
    onValue(soilDetailsRef, (snapshot) => {
        totalSoilEntries = snapshot.size;
        totalSoilEntriesElement.innerHTML = `<i class="fas fa-plus"></i> ${totalSoilEntries}`;

    });
}

// Fetch and display distributor details

const displayDistributorDetails = () => {
    onValue(distributorDetailsRef, (snapshot) => {
        totalDistributorEntries = snapshot.size;
        totalDistributorEntriesElement.innerHTML = `<i class="fas fa-plus"></i> ${totalDistributorEntries}`;
    });
}

displayDistributorDetails();
displaySoilDetails();