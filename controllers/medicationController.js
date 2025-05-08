const Medication = require('../models/Medication');
const User = require('../models/User'); // Import the User model

// Add a new medication for a user
const addMedication = async (req, res) => {
    const { userId, sicknessName, description, startDate, endDate, occurrenceDays, occurrenceTimes } = req.body;

    // Validate required fields
    if (!userId || !sicknessName || !startDate || !occurrenceDays || !occurrenceTimes) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        // Check if the user exists in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Create a new medication document
        const medication = new Medication({
            userId,
            sicknessName,
            description,
            startDate,
            endDate,
            occurrenceDays,
            occurrenceTimes
        });

        await medication.save();
        return res.status(201).json({ success: true, message: 'Medication added successfully.' });

    } catch (error) {
        console.error('Error adding medication:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

module.exports = {
    addMedication,
};
