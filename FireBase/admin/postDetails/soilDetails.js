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

const location = document.getElementById("location");
const soilColor = document.getElementById("soilColor");
const soilpH = document.getElementById("soilpH");
const orgaincMatterContent = document.getElementById("orgaincMatterContent");
const moistureContent = document.getElementById("moistureContent");
const texture = document.getElementById("texture");
const suitableCrop = document.getElementById("suitableCrop");

const nitogenLevel = document.getElementById("nitogenLevel");
const phosphorusLevel = document.getElementById("phosphorusLevel");
const pottasiumLevel = document.getElementById("pottasiumLevel");
const calciumLevel = document.getElementById("calciumLevel");
const magnesiumLevel = document.getElementById("magnesiumLevel");
const sulfurLevel = document.getElementById("sulfurLevel");
const ironLevel = document.getElementById("ironLevel");
const manganeseLevel = document.getElementById("manganeseLevel");
const copperLevel = document.getElementById("copperLevel");
const zincLevel = document.getElementById("zincLevel");


const addSoilDetailsBtn = document.getElementById("addSoilDetailsBtn");
const soilDetailsForm = document.getElementById("soilDetailsForm");
const randomNumberGenarator = () => {
    const date = new Date();
    const num1 = Math.round(Math.random() * 1000) + 1;
    const num2 = Math.round(Math.random() * 1000) + 1;
    return date.getUTCMilliseconds() + num1.toString() + num2.toString() + date.getUTCSeconds();
}
const validateFields = () => {
    return location.value && soilColor.value && soilpH.value && orgaincMatterContent.value && moistureContent.value &&
        texture.value && suitableCrop.value && nitogenLevel.value && phosphorusLevel.value && pottasiumLevel.value &&
        calciumLevel.value && magnesiumLevel.value && sulfurLevel.value && ironLevel.value && manganeseLevel.value &&
        copperLevel.value && zincLevel.value;
}
const addSoilDetails = () => {
    if (!validateFields()) {
        alert("You need to fill all fields");
        return;
    }
    const randomId = randomNumberGenarator(); // Generate a random number
    set(ref(db, "SoilDetails/" + randomId), {
        Location: location.value,
        SoilColor: soilColor.value,
        SoilpH: soilpH.value,
        OrganicMatter: orgaincMatterContent.value,
        moisture: moistureContent.value,
        texture: texture.value,
        suitableCrop: suitableCrop.value,
        NutrientLevel: {
            Nitogen: nitogenLevel.value,
            Phosphorus: phosphorusLevel.value,
            Pottasium: pottasiumLevel.value,
            Calcium: calciumLevel.value,
            Magnesium: magnesiumLevel.value,
            Sulfur: sulfurLevel.value,
            Iron: ironLevel.value,
            Manganese: manganeseLevel.value,
            Copper: copperLevel.value,
            Zinc: zincLevel.value
        }
    }).then(() => {
        alert("Soil Details Added Successfully");
        soilDetailsForm.reset();
    }).catch(error => {
        alert("error: " + error);
    })
}

addSoilDetailsBtn.addEventListener('click', addSoilDetails);
