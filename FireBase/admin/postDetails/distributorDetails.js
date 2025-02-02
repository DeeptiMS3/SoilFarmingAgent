import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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

const distributorId = document.getElementById("distributorId");
const distributorName = document.getElementById("distributorName");
const contactPerson = document.getElementById("contactPerson");
const contactNumber = document.getElementById("contactNumber");
const emailAddress = document.getElementById("emailAddress");
const state = document.getElementById("state");
const city = document.getElementById("city");
const address = document.getElementById("address");
const postalCode = document.getElementById("postalCode");
const products = document.getElementById("products");


const addDistributorDetailsBtn = document.getElementById("addDistributorDetailsBtn");
const distributorForm = document.getElementById("distributorForm");
const randomNumberGenarator = () => {
    const date = new Date();
    const num1 = Math.round(Math.random() * 1000) + 1;
    const num2 = Math.round(Math.random() * 1000) + 1;
    return date.getUTCMilliseconds() + num1.toString() + num2.toString() + date.getUTCSeconds();
}
const validateFields = () => {
    return distributorId.value && distributorName.value && contactPerson.value && contactNumber.value && emailAddress.value &&
        state.value && city.value && address.value && postalCode.value && products.value;
}
const addDistributorDetails = () => {
    if (!validateFields()) {
        alert("You need to fill all fields");
        return;
    }
    const randomId = randomNumberGenarator(); // Generate a random number
    set(ref(db, "DistributorDetails/" + randomId), {
        DistributorId: distributorId.value,
        DistributorName: distributorName.value,
        ContactPerson: contactPerson.value,
        ContactNumber: contactNumber.value,
        EmailAddress: emailAddress.value,
        State: state.value,
        City: city.value,
        Address: address.value,
        PostalCode: postalCode.value,
        Products: products.value
    }).then(() => {
        alert("Distributor Details Added Successfully");
        distributorForm.reset();
    }).catch(error => {
        alert("error: " + error);
    })
}

addDistributorDetailsBtn.addEventListener('click', addDistributorDetails);
