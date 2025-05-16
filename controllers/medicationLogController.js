const MedicationLog = require('../models/MedicationLog');
const Medication = require('../models/Medication');
const Caregiver = require('../models/Caregiver');
const sendEmail = require('../utils/email');
const User = require('../models/User');


const addMedicationLog = async (req, res) => {
    const { medicationId, occurrenceTime, status } = req.body;

    if (!medicationId || !occurrenceTime || !status) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        // Find the medication
        const medication = await Medication.findById(medicationId);
        if (!medication) {
            return res.status(404).json({ success: false, message: 'Medication not found.' });
        }

        // Save the medication log
        const logData = { medicationId, occurrenceTime, status };
        await MedicationLog.findOneAndUpdate(
            { medicationId, occurrenceTime },
            logData,
            { upsert: true, new: true }
        );

        // Send email notification if status is "missed"
        if (status === 'missed') {
            try {
                // Find caregiver(s) linked to the user
                const caregivers = await Caregiver.find({ userId: medication.userId });

                // Fetch user details to include in the email
                const user = await User.findById(medication.userId);
                if (!user) {
                    console.error('User not found');
                    return;
                }

                if (caregivers.length > 0) {
                    const emailList = caregivers.map(cg => cg.email).join(', ');
                    const subject = `Medication Missed: ${medication.sicknessName}`;
                    const text = `The medication "${medication.sicknessName}" for ${user.firstName} ${user.lastName} scheduled at ${occurrenceTime} was marked as missed.`;

                    await sendEmail(emailList, subject, text);
                    console.log(`Notification sent to: ${emailList}`);
                }
            } catch (error) {
                console.error('Error sending caregiver notification:', error);
            }
        }


        return res.status(201).json({ success: true, message: 'Medication log saved successfully.' });
    } catch (error) {
        console.error('Error adding medication log:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// Convert local date to UTC 
const getLocalDateInUTC = () => {
    const today = new Date();
    const startOfDayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);
    const endOfDayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59);

    return { startOfDayUTC, endOfDayUTC };
};

// Get today's medications 
const getTodaysMedicationsByStatus = async (req, res) => {
    const { userId, status } = req.params;

    if (!['taken', 'missed'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status. Use "taken" or "missed".' });
    }

    try {
        const { startOfDayUTC, endOfDayUTC } = getLocalDateInUTC();

        const medications = await Medication.find({ userId });

        const medicationIds = medications.map(med => med._id);

        const logs = await MedicationLog.find({
            medicationId: { $in: medicationIds },
            status: status,
            createdAt: {
                $gte: startOfDayUTC,
                $lt: endOfDayUTC
            }
        }).populate('medicationId', 'sicknessName description');

        const result = logs.map(log => ({
            medicationName: log.medicationId.sicknessName,
            medicationDescription: log.medicationId.description,
            occurrenceTime: log.occurrenceTime,
            status: log.status
        }));

        return res.status(200).json({ success: true, medications: result, date: startOfDayUTC });

    } catch (error) {
        console.error('Error fetching today\'s medications:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

module.exports = {
    addMedicationLog,
    getTodaysMedicationsByStatus,
};
