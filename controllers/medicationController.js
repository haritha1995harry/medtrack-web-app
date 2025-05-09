const Medication = require('../models/Medication');
const User = require('../models/User'); 

const addMedication = async (req, res) => {
    const { userId, sicknessName, description, startDate, endDate, occurrenceDays, occurrenceTimes } = req.body;

    if (!userId || !sicknessName || !startDate || !occurrenceDays || !occurrenceTimes) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

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

// get upcoming medications
const getUpcomingMedications = async (req, res) => {
    const { userId } = req.params;

    try {
        const today = new Date();
        const todayDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

        const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayDay = weekdayNames[today.getDay()];
        const currentTime = today.toTimeString().slice(0, 5); 

        const medications = await Medication.find({ userId });

        const upcomingMedications = medications.filter(med => {
            const start = new Date(med.startDate).toISOString().slice(0, 10);
            const end = med.endDate ? new Date(med.endDate).toISOString().slice(0, 10) : null;

            const isWithinDateRange = (todayDate === start) || ((todayDate > start) && (!end || todayDate <= end));

            const isTodayScheduled = med.occurrenceDays.includes(todayDay) || med.occurrenceDays.includes("All Days");

            const upcomingTimes = med.occurrenceTimes.filter(time => time > currentTime);

            return isWithinDateRange && isTodayScheduled && upcomingTimes.length > 0;
        });

        upcomingMedications.forEach(med => {
            med.occurrenceTimes = med.occurrenceTimes.filter(time => time > currentTime);
            med.occurrenceTimes.sort();
        });

        return res.status(200).json({ success: true, medications: upcomingMedications });

    } catch (error) {
        console.error('Error fetching upcoming medications:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

module.exports = {
    addMedication,
    getUpcomingMedications,
};
