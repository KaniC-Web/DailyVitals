document.addEventListener('DOMContentLoaded', () => {
  const vitalsForm = document.getElementById('vitalsForm');
  const vitalsTableBody = document.querySelector('#vitalsTable tbody');
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const idInput = document.getElementById('id');
  const heartRateInput = document.getElementById('editHeartRate');
  const bloodPressureInput = document.getElementById('editBloodPressure');
  const temperatureInput = document.getElementById('editTemperature');

  function fetchVitals() {
    fetch('http://localhost:5001/api/vitals')
      .then(response => response.json())
      .then(data => {
        vitalsTableBody.innerHTML = '';
        data.forEach(vital => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${vital._id}</td>
            <td>${vital.heartRate}</td>
            <td>${vital.bloodPressure}</td>
            <td>${vital.temperature}</td>
            <td>
              <button onclick="editVital('${vital._id}', '${vital.heartRate}', '${vital.bloodPressure}', '${vital.temperature}')">Edit</button>
              <button class="delete" onclick="deleteVital('${vital._id}')">Delete</button>
            </td>
          `;
          vitalsTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching vitals:', error));
  }

  // Show edit modal
  window.editVital = function(id, heartRate, bloodPressure, temperature) {
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

  // Handle update
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = idInput.value;
    const heartRate = heartRateInput.value;
    const bloodPressure = bloodPressureInput.value;
    const temperature = temperatureInput.value;

    const vital = { heartRate, bloodPressure, temperature };

    fetch(`http://localhost:5001/api/vitals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vital),
    })
      .then(response => response.json())
      .then(() => {
        fetchVitals();
        editModal.style.display = 'none';
      })
      .catch(error => console.error('Error updating vital:', error));
  });

  vitalsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const heartRate = document.getElementById('heartRate').value;
    const bloodPressure = document.getElementById('bloodPressure').value;
    const temperature = document.getElementById('temperature').value;

    const vital = { heartRate, bloodPressure, temperature };

    fetch('http://localhost:5001/api/vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vital),
    })
      .then(response => response.json())
      .then(() => {
        fetchVitals();
        vitalsForm.reset();
      })
      .catch(error => console.error('Error adding vital:', error));
  });

  window.deleteVital = function(id) {
    fetch(`http://localhost:5001/api/vitals/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchVitals())
      .catch(error => console.error('Error deleting vital:', error));
  };

  fetchVitals();
});
