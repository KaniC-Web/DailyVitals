document.addEventListener('DOMContentLoaded', () => {
  const vitalsForm = document.getElementById('vitalsForm');
  const vitalsTableBody = document.querySelector('#vitalsTable tbody');

  // Function to fetch and display vitals
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
          .catch(error => console.error('Error fetching vitals:', error));
  }

  // Handle form submission to add a new vital
  vitalsForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      // Get form data
      const id = document.getElementById('id').value;
      const heartRate = document.getElementById('heartRate').value;
      const bloodPressure = document.getElementById('bloodPressure').value;
      const temperature = document.getElementById('temperature').value;

      // Create vital object
      const vital = { id, heartRate, bloodPressure, temperature };

      // Send POST request to add vital
      fetch('http://localhost:5000/api/vitals', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(vital),
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to add vital');
              }
              return response.json();
          })
          .then(() => {
              fetchVitals(); // Refresh vitals list
              vitalsForm.reset(); // Clear the form
          })
          .catch(error => console.error('Error adding vital:', error));
  });

  // Function to delete a vital by ID
  window.deleteVital = function (id) {
      fetch(`http://localhost:5000/api/vitals/${id}`, {
          method: 'DELETE',
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to delete vital');
              }
              fetchVitals(); // Refresh vitals list
          })
          .catch(error => console.error('Error deleting vital:', error));
  };

  // Initial fetch of vitals when page loads
  fetchVitals();
});
