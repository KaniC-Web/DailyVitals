document.addEventListener('DOMContentLoaded', () => {
  const vitalsForm = document.getElementById('vitalsForm');
  const vitalsTableBody = document.querySelector('#vitalsTable tbody');
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const idInput = document.getElementById('id');
  const heartRateInput = document.getElementById('editHeartRate');
  const bloodPressureInput = document.getElementById('editBloodPressure');
  const temperatureInput = document.getElementById('editTemperature');

  // Fetch all vitals and populate the table
  function fetchVitals() {
    fetch('http://localhost:5001/api/vitals')
      .then((response) => response.json())
      .then((data) => {
        vitalsTableBody.innerHTML = '';
        data.forEach((vital) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${vital._id}</td>
            <td>${vital.heartRate}</td>
            <td>${vital.bloodPressure}</td>
            <td>${vital.temperature}</td>
            <td>
              <button class="edit" onclick="editVital('${vital._id}', '${vital.heartRate}', '${vital.bloodPressure}', '${vital.temperature}')">Edit</button>
              <button class="delete" onclick="deleteVital('${vital._id}')">Delete</button>
            </td>
          `;
          vitalsTableBody.appendChild(row);
        });
      })
      .catch((error) => console.error('Error fetching vitals:', error));
  }

  // Open the edit modal and populate with the selected vital's details
  window.editVital = function (id, heartRate, bloodPressure, temperature) {
    idInput.value = id;
    heartRateInput.value = heartRate;
    bloodPressureInput.value = bloodPressure;
    temperatureInput.value = temperature;
    editModal.style.display = 'block';
  };

  // Close the edit modal
  document.getElementById('closeModal').addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  // Update a vital record
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = idInput.value;
    const heartRate = heartRateInput.value;
    const bloodPressure = bloodPressureInput.value;
    const temperature = temperatureInput.value;

    const updatedVital = { heartRate, bloodPressure, temperature };

    fetch(`http://localhost:5001/api/vitals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {heartRate, bloodPressure, temperature} ),
    })
      .then((response) => {
        if (response.ok) {
          alert('Vital updated successfully!');
          fetchVitals();
          editModal.style.display = 'none';
        } else {
          console.error('Error updating vital:', response.statusText);
        }
      })
      .catch((error) => console.error('Error updating vital:', error));
  }); 

  // Add a new vital record
  vitalsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const heartRate = document.getElementById('heartRate').value;
    const bloodPressure = document.getElementById('bloodPressure').value;
    const temperature = document.getElementById('temperature').value;

    const newVital = { heartRate, bloodPressure, temperature };

    fetch('http://localhost:5001/api/vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVital),
    })
      .then((response) => response.json())
      .then(() => {
        fetchVitals();
        vitalsForm.reset();
      })
      .catch((error) => console.error('Error adding vital:', error));
  });

  // Delete a vital record
  window.deleteVital = function (id) {
    fetch(`http://localhost:5001/api/vitals/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchVitals())
      .catch((error) => console.error('Error deleting vital:', error));
  };

  // Initialize the vitals list
  fetchVitals();
});
