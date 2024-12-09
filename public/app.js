document.addEventListener('DOMContentLoaded', () => { 
    const vitalsForm = document.getElementById('vitalsForm');
    const vitalsTableBody = document.querySelector('#vitalsTable tbody');
  
    // Fetch all vitals from the API and display them
    fetch('http://localhost:5001/api/vitals')  // Ensure the server is running on this port
    .then(response => response.json())
    .then(vitals => {
      const vitalsTable = document.querySelector('#vitals-table');
      vitalsTable.innerHTML = ''; // Clear the table
      vitals.forEach(vital => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${vital._id}</td>
          <td>${vital.heartRate}</td>
          <td>${vital.bloodPressure}</td>
          <td>${vital.temperature}</td>
          <td>
            <button onclick="editVital('${vital._id}')">Edit</button>
            <button onclick="deleteVital('${vital._id}')">Delete</button>
          </td>
        `;
        vitalsTable.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching vitals:', error));
  
  
    // Handle the form submission to add a new vital
    vitalsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = document.getElementById('id').value;
      const heartRate = document.getElementById('heartRate').value;
      const bloodPressure = document.getElementById('bloodPressure').value;
      const temperature = document.getElementById('temperature').value;
  
      const vital = { id, heartRate, bloodPressure, temperature };
  
      fetch('http://localhost:5001/api/vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vital),
      })
        .then(response => response.json())
        .then(() => {
          fetchVitals(); // Refresh the table after adding
          vitalsForm.reset(); // Reset form fields
        })
        .catch(error => console.error('Error adding vital:', error));
    });
  
    // Delete a vital by its ID
    window.deleteVital = function(id) {
      fetch(`http://localhost:5001/api/vitals/${id}`, {
        method: 'DELETE',
      })
      .then(() => fetchVitals()) // Refresh the vitals table
      .catch(error => console.error('Error deleting vital:', error));
    };
  
    // Initial fetch of vitals to populate the table
    fetchVitals();
  });
  