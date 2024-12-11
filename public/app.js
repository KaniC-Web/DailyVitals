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
              <button class="edit" onclick="editVital('${vital._id}', '${vital.heartRate}', '${vital.bloodPressure}', '${vital.temperature}')">Edit</button>
              <button class="delete" onclick="deleteVital('${vital._id}')">Delete</button>
            </td>
          `;
          vitalsTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching vitals:', error));
  }

  window.editVital = function (id, heartRate, bloodPressure, temperature) {
    idInput.value = id;
    heartRateInput.value = heartRate;
    bloodPressureInput.value = bloodPressure;
    temperatureInput.value = temperature;
    editModal.style.display = 'block';
  };

  document.getElementById('closeModal').addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  editForm.addEventListener('submit', event => {
    event.preventDefault();
    const id = idInput.value;
    const updatedVital = {
      heartRate: heartRateInput.value,
      bloodPressure: bloodPressureInput.value,
      temperature: temperatureInput.value,
    };

    fetch(`http://localhost:5001/api/vitals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedVital),
    })
      .then(response => {
        if (response.ok) {
          alert('Vital updated successfully!');
          fetchVitals();
          editModal.style.display = 'none';
        } else {
          return response.json().then(err => {
            alert('Failed to update vital: ' + (err.message || response.statusText));
          });
        }
      })
      .catch(error => console.error('Error updating vital:', error));
  });

  vitalsForm.addEventListener('submit', event => {
    event.preventDefault();
    const newVital = {
      heartRate: document.getElementById('heartRate').value,
      bloodPressure: document.getElementById('bloodPressure').value,
      temperature: document.getElementById('temperature').value,
    };

    fetch('http://localhost:5001/api/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVital),
    })
      .then(() => {
        fetchVitals();
        vitalsForm.reset();
      })
      .catch(error => console.error('Error adding vital:', error));
  });

  window.deleteVital = function (id) {
    fetch(`http://localhost:5001/api/vitals/${id}`, { method: 'DELETE' })
      .then(() => fetchVitals())
      .catch(error => console.error('Error deleting vital:', error));
  };

  function fetchHealthTips() {
    fetch('http://localhost:5001/api/vitals/health-tips')
      .then(response => response.json())
      .then(data => {
        const tipsSection = document.getElementById('health-tips');
        if (Array.isArray(data.tips) && data.tips.length > 0) {
          tipsSection.innerHTML = data.tips.map(tip => `<p>${tip}</p>`).join('');
        } else {
          tipsSection.innerHTML = '<p>No health tips available at this time.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching health tips:', error);
        const tipsSection = document.getElementById('health-tips');
        tipsSection.innerHTML = '<p>Error fetching health tips.</p>';
      });
  }

  fetchVitals();
  fetchHealthTips();
});
