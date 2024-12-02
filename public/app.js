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
