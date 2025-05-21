


document.addEventListener("DOMContentLoaded", async () => {
    try {

        const sessionRes = await fetch('/session-user');
        const sessionData = await sessionRes.json();
        if (!sessionData.success) {
            window.location.href = '/login';
            return;
        }

        const userId = sessionData.userId;

        const response = await fetch(`/api/caregivers/user/${userId}`);
        const data = await response.json();

        if (data.success && data.caregivers.length > 0) {
            const caregiversList = document.querySelector('#caregivers-list');

            let tableHtml = `
                <table class="caregivers-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.caregivers.forEach(caregiver => {
                tableHtml += `
                    <tr>
                        <td>${caregiver.firstName}</td>
                        <td>${caregiver.lastName}</td>
                        <td>${caregiver.email}</td>
                        <td>${caregiver.contactNumber}</td>
                    </tr>
                `;
            });

            tableHtml += `
                    </tbody>
                </table>
            `;

            caregiversList.innerHTML = tableHtml;

            document.querySelectorAll('#caregivers-list tbody tr').forEach(row => {
                row.addEventListener('click', () => {
                    document.querySelectorAll('#caregivers-list tbody tr').forEach(r => r.classList.remove('selected'));
                    row.classList.add('selected');
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 4) {
                        document.getElementById('firstName').value = cells[0].textContent;
                        document.getElementById('lastName').value = cells[1].textContent;
                        document.getElementById('email').value = cells[2].textContent;
                        document.getElementById('contactNumber').value = cells[3].textContent;
                    }
                });
            });
        } else {
            document.querySelector('#caregivers-list').innerHTML = '<p>No caregivers found.</p>';
        }
    } catch (error) {
        console.error('Error loading caregivers:', error);
        document.querySelector('#caregivers-list').innerHTML = '<p>Error loading caregivers. Please try again later.</p>';
    }

    const form = document.getElementById('caregiverForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        const sessionRes = await fetch('/session-user');
        const sessionData = await sessionRes.json();
        if (!sessionData.success) {
            window.location.href = '/login';
            return;
        }

        const userId = sessionData.userId;

        const payload = {
            userId: userId,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            contactNumber: formData.get('contactNumber')
        };

        try {
            const response = await fetch('/api/caregivers/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                alert('Caregiver added!');
                form.reset();
                location.reload(); 
            } else {
                document.getElementById('error-message').textContent = result.message || 'Something went wrong.';
            }
        } catch (err) {
            console.error('Error adding caregiver:', err);
            document.getElementById('error-message').textContent = 'Server error. Please try again later.';
        }
    });
});

