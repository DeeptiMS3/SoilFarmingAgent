import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue, update, remove, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
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

// Reference to the table body
const tableBody = document.getElementById("soilDetailsTableBody");

// Fetch and display soil details
const displaySoilDetails = () => {
    onValue(soilDetailsRef, (snapshot) => {
        tableBody.innerHTML = ""; // Clear the table body before adding new data
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const soilData = childSnapshot.val();
                const soilKey = childSnapshot.key; // Get the unique key of the entry

                const row = `
                    <tr id="row-${soilKey}">
                        <td>${soilData.Location}</td>
                        <td>${soilData.SoilColor}</td>
                        <td>${soilData.SoilpH}</td>
                        <td>${soilData.OrganicMatter}</td>
                        <td>${soilData.moisture}</td>
                        <td>${soilData.texture}</td>
                        <td>${soilData.suitableCrop}</td>
                        <td>Nitrogen<br>Phosphorus<br>Pottasium<br>Calcium<br>Magnesium<br>Sulfur<br>Iron<br>Manganese<br>Copper<br>Zinc</td>
                        <td>${soilData.NutrientLevel?.Nitogen}<br>${soilData.NutrientLevel?.Phosphorus}<br>${soilData.NutrientLevel?.Pottasium}<br>${soilData.NutrientLevel?.Calcium}<br>${soilData.NutrientLevel?.Magnesium}<br>${soilData.NutrientLevel?.Sulfur}<br>${soilData.NutrientLevel?.Iron}<br>${soilData.NutrientLevel?.Manganese}<br>${soilData.NutrientLevel?.Copper}<br>${soilData.NutrientLevel?.Zinc}</td>
                        <td><button class="btn btn-outline-primary" onclick="editSoilEntry('${soilKey}')">Edit</button></td>
                        <td><button class="btn btn-outline-danger" onclick="deleteSoilEntry('${soilKey}')">Delete</button></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = "<tr><td colspan='10'>No soil details available</td></tr>";
        }
    }, (error) => {
        console.error("Error fetching data: ", error);
    });
};

// Edit soil entry
window.editSoilEntry = (key) => {
    const row = document.getElementById(`row-${key}`);
    const cells = row.getElementsByTagName('td');

    // Regular Fields for Update
    const fields = [
        { name: "Location", current: cells[0].innerText },
        { name: "SoilColor", current: cells[1].innerText },
        { name: "SoilpH", current: cells[2].innerText },
        { name: "OrganicMatter", current: cells[3].innerText },
        { name: "moisture", current: cells[4].innerText },
        { name: "texture", current: cells[5].innerText },
        { name: "suitableCrop", current: cells[6].innerText }
    ];


    let choice = prompt(
        "Choose what to edit:\n" +
        "1. General Soil Details\n" +
        "2. Nutrient Levels"
    );

    if (choice === "1") {
        let selectedFields = prompt(
            "Enter the numbers of the fields you want to update, separated by commas:\n" +
            fields.map((field, index) => `${index + 1}. ${field.name} (Current: ${field.current})`).join("\n")
        );

        if (!selectedFields) {
            alert("No fields selected. Update canceled.");
            return;
        }

        selectedFields = selectedFields.split(',').map(num => parseInt(num.trim()) - 1).filter(index => index >= 0 && index < fields.length);

        const updates = {};

        selectedFields.forEach(index => {
            const newValue = prompt(`Enter new value for ${fields[index].name}:`, fields[index].current);
            if (newValue !== null) {
                updates[fields[index].name] = newValue;
            }
        });

        if (Object.keys(updates).length > 0) {
            update(ref(db, `SoilDetails/${key}`), updates)
                .then(() => {
                    alert('Soil entry updated successfully!');
                    displaySoilDetails(); // Refresh the table
                })
                .catch((error) => {
                    console.error("Error updating entry: ", error);
                });
        } else {
            alert("No updates were made.");
        }
    }

    else if (choice === "2") {
        // Fetch NutrientLevel directly from DB
        get(ref(db, `SoilDetails/${key}/NutrientLevel`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const nutrientData = snapshot.val();
                    const nutrientFields = Object.keys(nutrientData).map((key) => ({
                        name: key,
                        current: nutrientData[key]
                    }));

                    let selectedNutrients = prompt(
                        "Enter the numbers of the nutrients you want to update, separated by commas:\n" +
                        nutrientFields.map((nutrient, index) => `${index + 1}. ${nutrient.name} (Current: ${nutrient.current})`).join("\n")
                    );

                    if (!selectedNutrients) {
                        alert("No nutrients selected. Update canceled.");
                        return;
                    }

                    selectedNutrients = selectedNutrients.split(',').map(num => parseInt(num.trim()) - 1).filter(index => index >= 0 && index < nutrientFields.length);

                    const updates = {};

                    selectedNutrients.forEach(index => {
                        const newValue = prompt(`Enter new value for ${nutrientFields[index].name}:`, nutrientFields[index].current);
                        if (newValue !== null) {
                            updates[`NutrientLevel/${nutrientFields[index].name}`] = newValue;
                        }
                    });

                    if (Object.keys(updates).length > 0) {
                        update(ref(db, `SoilDetails/${key}`), updates)
                            .then(() => {
                                alert('Nutrient levels updated successfully!');
                                displaySoilDetails(); // Refresh the table
                            })
                            .catch((error) => {
                                console.error("Error updating nutrients: ", error);
                            });
                    } else {
                        alert("No updates were made.");
                    }
                } else {
                    alert("No nutrient data found for this entry.");
                }
            })
            .catch((error) => {
                console.error("Failed to retrieve nutrient data: ", error);
            });
    }

    else {
        alert("Invalid choice. Update canceled.");
    }
};



// Delete soil entry
window.deleteSoilEntry = (key) => {
    const confirmDelete = confirm("Are you sure you want to delete this soil entry?");
    if (confirmDelete) {
        remove(ref(db, `SoilDetails/${key}`))
            .then(() => {
                alert('Soil entry deleted successfully!');
                displaySoilDetails(); // Refresh the table
            })
            .catch((error) => {
                console.error("Error deleting entry: ", error);
            });
    }
};

// Initial display of soil details
displaySoilDetails();
