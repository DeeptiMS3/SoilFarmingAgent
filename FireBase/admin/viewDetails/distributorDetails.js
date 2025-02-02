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
const distributorDetailsRef = ref(db, "DistributorDetails/");

// Reference to the table body
const tableBody = document.getElementById("distributorDetailsTableBody");

// Fetch and display distributor details
const displayDistributorDetails = () => {
    onValue(distributorDetailsRef, (snapshot) => {
        tableBody.innerHTML = ""; // Clear the table body before adding new data
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const distributorData = childSnapshot.val();
                const distributorKey = childSnapshot.key; // Get the unique key of the entry

                const row = `
                    <tr id="row-${distributorKey}">
                        <td>${distributorData.DistributorId}</td>
                        <td>${distributorData.DistributorName}</td>
                        <td>${distributorData.ContactPerson}</td>
                        <td>${distributorData.ContactNumber}</td>
                        <td>${distributorData.EmailAddress}</td>
                        <td>${distributorData.State}</td>
                        <td>${distributorData.City}</td>
                        <td>${distributorData.Address}</td>
                        <td>${distributorData.PostalCode}</td>
                        <td>${distributorData.Products}</td>
                        <td><button class="btn btn-outline-primary" onclick="editdistributorEntry('${distributorKey}')">Edit</button></td>
                        <td><button class="btn btn-outline-danger" onclick="deletedistributorEntry('${distributorKey}')">Delete</button></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = "<tr><td colspan='10'>No distributor details available</td></tr>";
        }
    }, (error) => {
        console.error("Error fetching data: ", error);
    });
};

// Edit distributor entry
window.editdistributorEntry = (key) => {
    const row = document.getElementById(`row-${key}`);
    const cells = row.getElementsByTagName('td');

    // Regular Fields for Update
    const fields = [
        { name: "DistributorId", current: cells[0].innerText },
        { name: "DistributorName", current: cells[1].innerText },
        { name: "ContactPerson", current: cells[2].innerText },
        { name: "ContactNumber", current: cells[3].innerText },
        { name: "EmailAddress", current: cells[4].innerText },
        { name: "State", current: cells[5].innerText },
        { name: "City", current: cells[6].innerText },
        { name: "Address", current: cells[7].innerText },
        { name: "PostalCode", current: cells[8].innerText },
        { name: "Products", current: cells[9].innerText }
    ];


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
        update(ref(db, `DistributorDetails/${key}`), updates)
            .then(() => {
                alert('Distributor entry updated successfully!');
                displaySoilDetails(); // Refresh the table
            })
            .catch((error) => {
                console.error("Error updating entry: ", error);
            });
    } else {
        alert("No updates were made.");
    }

};

// Delete distributor entry
window.deletedistributorEntry = (key) => {
    const confirmDelete = confirm("Are you sure you want to delete this Distributor entry?");
    if (confirmDelete) {
        remove(ref(db, `DistributorDetails/${key}`))
            .then(() => {
                alert('Distributor entry deleted successfully!');
                displayDistributorDetails(); // Refresh the table
            })
            .catch((error) => {
                console.error("Error deleting entry: ", error);
            });
    }
};

// Initial display of soil details
displayDistributorDetails();
