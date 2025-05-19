const express = require('express');
const { registerCaregiver, getCaregiversByUser, getCaregiverById } = require('../controllers/caregiverController');
const router = express.Router();


// Register caregiver
router.post('/register', registerCaregiver);

// Get all caregivers by user ID
router.get('/user/:userId', getCaregiversByUser);

// Get caregiver by ID
router.get('/:id', getCaregiverById);

module.exports = router;
