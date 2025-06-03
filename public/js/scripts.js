
document.addEventListener("DOMContentLoaded", async () => {
     
    try {
        const response = await fetch('/api/medications/upcoming/68200f0c449e4521536a9f61');
        const data = await response.json();

        if (data.success) {
            const medications = data.medications;
            const wrapper = document.querySelector('#upcoming');
            wrapper.innerHTML = ""; 

            medications.forEach(med => {
                med.occurrenceTimes.forEach(time => {
                    const card = document.createElement('div');
                    card.classList.add('medication-card');

                    card.innerHTML = `
                        <div class="medication-card-title">
                            <h5>${med.sicknessName}</h5>
                            <h5 style = "display:flex; gap:6px; align-items:center"> <img src="../images/clock.svg" alt="Taken">${time}</h5>
                        </div>
                        <div class="medication-card-description">
                            <p>${med.description || 'No description available'}</p>
                        </div>
                        <div class="medication-card-buttons">
                            <img src="../images/taken.svg" alt="Taken" class="taken-btn" data-id="${med._id}" data-time="${time}">
                            <img src="../images/missed.svg" alt="Missed" class="missed-btn" data-id="${med._id}" data-time="${time}">
                        </div>
                    `;
                    wrapper.appendChild(card);
                });
            });

            addMedicationLogEventListeners();
        } else {
            console.error("Failed to fetch medications:", data.message);
        }
    } catch (error) {
        console.error("Error loading recent medications:", error);
    }

    try {
        const response = await fetch('/api/medications/logs/today/68200f0c449e4521536a9f61/taken');
        const dataRec = await response.json();

        if (dataRec.success) {
            const medications = dataRec.medications;
            const wrapper = document.querySelector('#recent');
            wrapper.innerHTML = ""; 

            medications.forEach(med => {
                    const card = document.createElement('div');
                    card.classList.add('medication-card');

                    card.innerHTML = `
                        <div class="medication-card-title">
                            <h5>${med.medicationName}</h5>
                            <h5 style = "display:flex; gap:6px; align-items:center"> <img src="../images/clock.svg" alt="Taken">${med.occurrenceTime}</h5>
                        </div>
                        <div class="medication-card-description">
                            <p>${med.medicationDescription || 'No description available'}</p>
                        </div>
                    `;
                    wrapper.appendChild(card);
            });
        } else {
            console.error("Failed to fetch medications:", data.message);
        }
    } catch (error) {
        console.error("Error loading upcoming medications:", error);
        console.log(dataRec);
    }

    try {
        const response = await fetch('/api/medications/logs/today/68200f0c449e4521536a9f61/missed');
        const dataRec = await response.json();

        if (dataRec.success) {
            const medications = dataRec.medications;
            const wrapper = document.querySelector('#missed');
            wrapper.innerHTML = ""; 

            medications.forEach(med => {
                    const card = document.createElement('div');
                    card.classList.add('medication-card');
                    card.classList.add('missed-card');

                    card.innerHTML = `
                        <div class="medication-card-title">
                            <h5>${med.medicationName}</h5>
                            <h5 style = "display:flex; gap:6px; align-items:center"> <img src="../images/clock.svg" alt="Taken">${med.occurrenceTime}</h5>
                        </div>
                        <div class="medication-card-description">
                            <p>${med.medicationDescription || 'No description available'}</p>
                        </div>
                    `;
                    wrapper.appendChild(card);
            });
        } else {
            console.error("Failed to fetch medications:", data.message);
        }
    } catch (error) {
        console.error("Error loading missed medications:", error);
        console.log(dataRec);
    }

  
   
});

function addMedicationLogEventListeners() {
    document.querySelectorAll('.taken-btn').forEach(btn => {
        btn.addEventListener('click', () => handleMedicationLog(btn, 'taken'));
    });

    document.querySelectorAll('.missed-btn').forEach(btn => {
        btn.addEventListener('click', () => handleMedicationLog(btn, 'missed'));
    });
}

async function handleMedicationLog(button, status) {
    const medicationId = button.getAttribute('data-id');
    const occurrenceTime = button.getAttribute('data-time');

    try {
        const response = await fetch('/api/medications/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ medicationId, occurrenceTime, status })
        });

        const result = await response.json();
        if (result.success) {
            alert(`Marked as ${status}`);
            location.reload();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error updating medication log:", error);
    }
}

window.onload = () => {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname.split('/').pop();

    navItems.forEach(item => {
        const id = item.id;

        if (id === currentPath || (currentPath === '' && id === 'dashboard')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};






const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!password || !confirmPassword) {
        confirmPasswordInput.style.color = '';
        return;
    }

    if (password === confirmPassword) {
        confirmPasswordInput.style.color = 'green';
    } else {
        confirmPasswordInput.style.color = 'red';
    }
}

passwordInput.addEventListener('input', validatePasswords);
confirmPasswordInput.addEventListener('input', validatePasswords);

