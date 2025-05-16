const Caregiver = require('../models/Caregiver');
const User = require('../models/User');

const registerCaregiver = async (req, res) => {
    const { userId, firstName, lastName, email, contactNumber } = req.body;

    if (!userId || !firstName || !lastName || !email || !contactNumber) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const existingCaregiver = await Caregiver.findOne({ email, userId });
        if (existingCaregiver) {
            return res.status(400).json({ success: false, message: 'Caregiver already registered for this user.' });
        }

        const newCaregiver = new Caregiver({
            userId,
            firstName,
            lastName,
            email,
            contactNumber
        });

        await newCaregiver.save();
        return res.status(201).json({ success: true, message: 'Caregiver registered successfully.' });

    } catch (error) {
        console.error('Error registering caregiver:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

const getCaregiversByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const caregivers = await Caregiver.find({ userId });
        return res.status(200).json({ success: true, caregivers });
    } catch (error) {
        console.error('Error fetching caregivers:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

const getCaregiverById = async (req, res) => {
    try {
        const caregiver = await Caregiver.findById(req.params.id).populate('userId', 'firstName lastName email');
        if (!caregiver) {
            return res.status(404).json({ success: false, message: 'Caregiver not found.' });
        }
        return res.status(200).json({ success: true, caregiver });
    } catch (error) {
        console.error('Error fetching caregiver:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

module.exports = {
    registerCaregiver,
    getCaregiversByUser,
    getCaregiverById
};
