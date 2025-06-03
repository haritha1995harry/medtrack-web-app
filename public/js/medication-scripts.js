


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userId = "68200f0c449e4521536a9f61";
        const response = await fetch(`/api/medications/user/${userId}`);
        const data = await response.json();

        if (data.success && data.medications.length > 0) {
            const medicationsList = document.querySelector('#medications-list');

            let tableHtml = `
                <table class="caregivers-table">
                    <thead>
                        <tr>
                            <th>Sickness</th>
                            <th>End date</th>
                            <th>Occurrence Days</th>
                            <th>Occurrence Times</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.medications.forEach(medication => {

                const formattedDays = medication.occurrenceDays.join(' | ');
                const formattedTimes = medication.occurrenceTimes.join(' | ');
                const endDateFormatted = medication.endDate
                    ? new Date(medication.endDate).toISOString().slice(0, 10)
                    : 'N/A';

                tableHtml += `
                    <tr>
                        <td>${medication.sicknessName}</td>
                        <td>${endDateFormatted}</td>
                        <td>${formattedDays}</td>
                        <td>${formattedTimes}</td>
                    </tr>
                `;
            });

            tableHtml += `
                    </tbody>
                </table>
            `;

            medicationsList.innerHTML = tableHtml;

            document.querySelectorAll('#medications-list tbody tr').forEach(row => {
                row.addEventListener('click', () => {
                    document.querySelectorAll('#medications-list tbody tr').forEach(r => r.classList.remove('selected'));
                    row.classList.add('selected');
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 4) {
                        document.getElementById('sicknessName').value = medication.sicknessName;
                        document.getElementById('description').value = medication.sicknessName;
                        document.getElementById('startDate').value = medication.sta;
                        document.getElementById('endDate').value = cmedication.sicknessName;
                    }
                });
            });
        } else {
            document.querySelector('#medications-list').innerHTML = '<p>No medications found.</p>';
        }
    } catch (error) {
        console.error('Error loading medications:', error);
        document.querySelector('#medications-list').innerHTML = '<p>Error loading medications. Please try again later.</p>';
    }
    const form = document.getElementById('userDetailsForm');

    // Add new time field
    document.getElementById('addTimeBtn').addEventListener('click', () => {
        const timeInputs = document.getElementById('timeInputs');
        const newInput = document.createElement('input');
        newInput.type = 'time';
        newInput.className = 'occurrenceTime';
        newInput.required = true;
        timeInputs.appendChild(newInput);
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        const occurrenceDays = [];
        form.querySelectorAll('input[name="occurrenceDays"]:checked').forEach(cb => {
            occurrenceDays.push(cb.value);
        });

        const occurrenceTimes = [];
        document.querySelectorAll('.occurrenceTime').forEach(input => {
            if (input.value) occurrenceTimes.push(input.value);
        });

        const payload = {
            userId: formData.get('userId'),
            sicknessName: formData.get('sicknessName'),
            description: formData.get('description'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            occurrenceDays,
            occurrenceTimes
        };

        try {
            const response = await fetch('/api/medications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.success) {
                alert('Medication saved!');
                form.reset();
                document.getElementById('timeInputs').innerHTML = '<input type="time" class="occurrenceTime" required>';
                location.reload();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            console.error(err);
            alert('Submission failed.');
        }
    });
});

