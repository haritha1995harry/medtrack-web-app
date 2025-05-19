document.addEventListener("DOMContentLoaded", async () => {
   try {
          console.log('hi');
        const userId = "68200f0c449e4521536a9f61"; 
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
        } else {
             document.querySelector('#caregivers-list').innerHTML = '<p>No caregivers found.</p>';
        }
    } catch (error) {
        console.error('Error loading caregivers:', error);
         document.querySelector('#caregivers-list').innerHTML = '<p>Error loading caregivers. Please try again later.</p>';
    }
});