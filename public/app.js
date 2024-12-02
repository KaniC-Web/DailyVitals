document.addEventListener('DOMContentLoaded', () => {
    const vitalsForm = document.getElementById('vitalsForm');
    const vitalsTableBody = document.querySelector('#vitalsTable tbody');
});
// Fetch vitals and display them
function fetchVitals() {
    fetch('http://localhost:5000/api/vitals')
      .then(response => response.json())
      .then(data => {
        vitalsTableBody.innerHTML = ''; // Clear current table rows
        data.forEach(vital => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${vital.id}</td>
            <td>${vital.heartRate}</td>
            <td>${vital.bloodPressure}</td>
            <td>${vital.temperature}</td>
            <td>
              <button onclick="deleteVital('${vital.id}')">Delete</button>
            </td>
          `;
          vitalsTableBody.appendChild(row);
        });
      })
      .catch(error => console.log(error));
  }

// Handle form submission to add a new vital
vitalsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const heartRate = document.getElementById('heartRate').value;
    const bloodPressure = document.getElementById('bloodPressure').value;
    const temperature = document.getElementById('temperature').value;

    const vital = { id, heartRate, bloodPressure, temperature };

    fetch('http://localhost:5000/api/vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vital),
      })
        .then(response => response.json())
        .then(() => {
          fetchVitals(); // Refresh vitals list
          vitalsForm.reset(); // Clear the form
        })
        .catch(error => console.log(error));
    });

    // Delete vital by ID
    window.deleteVital = function (id) {
    fetch(`http://localhost:5000/api/vitals/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchVitals()) // Refresh vitals list
      .catch(error => console.log(error));
  };