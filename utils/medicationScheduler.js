const cron = require('node-cron');
const Medication = require('../models/Medication');
const MedicationLog = require('../models/MedicationLog');
const Caregiver = require('../models/Caregiver');
const User = require('../models/User');
const sendEmail = require('./email'); // Email utility

// Helper to get current time in HH:mm format
const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
};

// Schedule the job to run every minute
const startMedicationScheduler = () => {
    cron.schedule('* * * * *', async () => {
        try {
            console.log("Running medication scheduler...");

            // Get current date and time
            const now = new Date();
            const todayDate = now.toISOString().slice(0, 10);
            const currentTime = getCurrentTime();

            // Get today's weekday
            const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const todayDay = weekdayNames[now.getDay()];

            // Fetch all upcoming medications for today
            const medications = await Medication.find();

            for (const med of medications) {
                const start = new Date(med.startDate).toISOString().slice(0, 10);
                const end = med.endDate ? new Date(med.endDate).toISOString().slice(0, 10) : null;
                
                // Check if the medication is within the date range and scheduled for today
                const isWithinDateRange = (todayDate === start) || ((todayDate > start) && (!end || todayDate <= end));
                const isTodayScheduled = med.occurrenceDays.includes(todayDay) || med.occurrenceDays.includes("All Days");

                if (isWithinDateRange && isTodayScheduled) {
                    for (const time of med.occurrenceTimes) {
                        const timeDifference = new Date(`1970-01-01T${currentTime}:00Z`) - new Date(`1970-01-01T${time}:00Z`);

                        // If time has passed by 1 minute and not already logged as missed
                        if (timeDifference > 0 && timeDifference <= 60000) {
                            const existingLog = await MedicationLog.findOne({ medicationId: med._id, occurrenceTime: time, status: 'missed' });

                            if (!existingLog) {
                                // Create missed log
                                const logData = { medicationId: med._id, occurrenceTime: time, status: 'missed' };
                                await MedicationLog.findOneAndUpdate(
                                    { medicationId: med._id, occurrenceTime: time },
                                    logData,
                                    { upsert: true, new: true }
                                );

                                // Fetch the user details
                                const user = await User.findById(med.userId);
                                if (!user) continue;

                                // Fetch caregivers
                                const caregivers = await Caregiver.find({ userId: med.userId });
                                if (caregivers.length > 0) {
                                    const emailList = caregivers.map(cg => cg.email).join(', ');
                                    const subject = `Medication Missed: ${med.sicknessName}`;
                                    const text = `The medication "${med.sicknessName}" for ${user.firstName} ${user.lastName} scheduled at ${time} was marked as missed.`;

                                    await sendEmail(emailList, subject, text);
                                    console.log(`Missed medication notification sent to: ${emailList}`);
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error in medication scheduler:', error);
        }
    });
};

module.exports = { startMedicationScheduler };
