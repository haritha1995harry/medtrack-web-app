const Caregiver = require('../models/Caregiver');

// Register a new caregiver
const registerCaregiver = async (req, res) => {
    try {
        const { userId, firstName, lastName, email, contactNumber } = req.body;

        const existingCaregiver = await Caregiver.findOne({ email });
        if (existingCaregiver) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const caregiver = new Caregiver({
            userId,
            firstName,
            lastName,
            email,
            contactNumber
        });

        await caregiver.save();
        res.status(201).json({ message: 'Caregiver registered successfully', caregiver });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get caregivers by user ID
const getCaregiversByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const caregivers = await Caregiver.find({ userId });
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single caregiver by ID
const getCaregiverById = async (req, res) => {
    try {
        const caregiver = await Caregiver.findById(req.params.id);
        if (!caregiver) {
            return res.status(404).json({ message: 'Caregiver not found' });
        }
        res.status(200).json(caregiver);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update caregiver by ID
const updateCaregiver = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, contactNumber } = req.body;

        const caregiver = await Caregiver.findById(id);
        if (!caregiver) return res.status(404).json({ message: 'Caregiver not found' });

        if (email && email !== caregiver.email) {
            const emailExists = await Caregiver.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        caregiver.firstName = firstName || caregiver.firstName;
        caregiver.lastName = lastName || caregiver.lastName;
        caregiver.email = email || caregiver.email;
        caregiver.contactNumber = contactNumber || caregiver.contactNumber;
        caregiver.updatedAt = Date.now();

        await caregiver.save();
        res.status(200).json({ message: 'Caregiver updated successfully', caregiver });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete caregiver
const deleteCaregiver = async (req, res) => {
    try {
        const { id } = req.params;
        const caregiver = await Caregiver.findByIdAndDelete(id);
        if (!caregiver) {
            return res.status(404).json({ message: 'Caregiver not found' });
        }
        res.status(200).json({ message: 'Caregiver deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all caregivers
const getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find();
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    registerCaregiver,
    getCaregiversByUser,
    getCaregiverById,
    updateCaregiver,
    deleteCaregiver,
    getAllCaregivers // 👈 add this export
};

