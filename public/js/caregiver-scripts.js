document.addEventListener('DOMContentLoaded', () => {
    fetchCaregivers(); // Fetch all caregivers on page load

    const caregiverForm = document.getElementById('caregiverForm');
    caregiverForm.addEventListener('submit', handleFormSubmit);
});

// Fetch all caregivers
async function fetchCaregivers() {
    try {
        const res = await fetch('/api/caregivers');
        const caregivers = await res.json();

        const container = document.getElementById('caregivers-list');
        container.innerHTML = '';

        if (!caregivers.length) {
            container.innerHTML = '<p>No caregivers found.</p>';
            return;
        }

        caregivers.forEach(caregiver => {
            const card = document.createElement('div');
            card.classList.add('medication-card');

            card.innerHTML = `
                <h5>${caregiver.firstName} ${caregiver.lastName}</h5>
                <p><strong>Email:</strong> ${caregiver.email}</p>
                <p><strong>Contact:</strong> ${caregiver.contactNumber}</p>
                <div class="btn-wrapper">
                    <button class="btn btn-edit" onclick="editCaregiver('${caregiver._id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteCaregiver('${caregiver._id}')">Delete</button>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error fetching caregivers:', err);
    }
}

// Optional: Fetch caregivers by specific user ID
async function fetchCaregiversByUser(userId) {
    try {
        const res = await fetch(`/api/caregivers/user/${userId}`);
        const caregivers = await res.json();

        const container = document.getElementById('caregivers-list');
        container.innerHTML = '';

        if (!caregivers.length) {
            container.innerHTML = '<p>No caregivers found for this user.</p>';
            return;
        }

        caregivers.forEach(caregiver => {
            const card = document.createElement('div');
            card.classList.add('medication-card');

            card.innerHTML = `
                <h5>${caregiver.firstName} ${caregiver.lastName}</h5>
                <p><strong>Email:</strong> ${caregiver.email}</p>
                <p><strong>Contact:</strong> ${caregiver.contactNumber}</p>
                <div class="btn-wrapper">
                    <button class="btn btn-edit" onclick="editCaregiver('${caregiver._id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteCaregiver('${caregiver._id}')">Delete</button>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error fetching caregivers by user:', err);
    }
}

// Handle form submission for add/edit caregiver
async function handleFormSubmit(event) {
    event.preventDefault();

    const caregiverId = document.getElementById('caregiverId').value;
    const userId = document.getElementById('userId').value;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();
    const errorMessage = document.getElementById('error-message');

    const payload = { userId, firstName, lastName, email, contactNumber };

    try {
        const res = await fetch(
            caregiverId ? `/api/caregivers/${caregiverId}` : '/api/caregivers/register',
            {
                method: caregiverId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        );

        const result = await res.json();

        if (!res.ok) {
            errorMessage.textContent = result.message || 'Something went wrong.';
            return;
        }

        errorMessage.textContent = '';
        document.getElementById('caregiverForm').reset();
        document.getElementById('caregiverId').value = '';

        // After adding or updating, refresh the list of caregivers
        fetchCaregivers();

    } catch (err) {
        errorMessage.textContent = 'Failed to submit form.';
    }
}

// Delete caregiver by ID
async function deleteCaregiver(id) {
    if (!confirm('Are you sure you want to delete this caregiver?')) return;

    try {
        const res = await fetch(`/api/caregivers/${id}`, { method: 'DELETE' });
        const result = await res.json();

        if (res.ok) {
            fetchCaregivers();
        } else {
            alert(result.message);
        }
    } catch (err) {
        alert('Error deleting caregiver.');
    }
}

// Load caregiver data into form for editing
async function editCaregiver(id) {
    try {
        const res = await fetch(`/api/caregivers/${id}`);
        const caregiver = await res.json();

        document.getElementById('caregiverId').value = caregiver._id;
        document.getElementById('firstName').value = caregiver.firstName;
        document.getElementById('lastName').value = caregiver.lastName;
        document.getElementById('email').value = caregiver.email;
        document.getElementById('contactNumber').value = caregiver.contactNumber;
    } catch (err) {
        alert('Failed to load caregiver data.');
    }
}

// Clear form fields and error messages
function clearForm() {
    document.getElementById('caregiverForm').reset();
    document.getElementById('caregiverId').value = '';
    document.getElementById('error-message').textContent = '';
}
