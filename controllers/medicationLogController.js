const MedicationLog = require('../models/MedicationLog');
const Medication = require('../models/Medication');

const addMedicationLog = async (req, res) => {
    const { medicationId, occurrenceTime, status } = req.body;

    if (!medicationId || !occurrenceTime || !status) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        const medication = await Medication.findById(medicationId);
        if (!medication) {
            return res.status(404).json({ success: false, message: 'Medication not found.' });
        }

        const logData = { medicationId, occurrenceTime, status };
        
        await MedicationLog.findOneAndUpdate(
            { medicationId, occurrenceTime }, // Composite key
            logData,
            { upsert: true, new: true }
        );

        return res.status(201).json({ success: true, message: 'Medication log saved successfully.' });
    } catch (error) {
        console.error('Error adding medication log:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

module.exports = {
    addMedicationLog,
};
