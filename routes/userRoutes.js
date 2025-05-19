const express = require('express');
const path = require('path');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Serve registration page
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/registration-page.html'));
});

// Serve login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login-page.html'));
});

// Serve dashboard page
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/dashboard.html'));
});


// Serve caregivers page
router.get('/caregivers', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/caregiver.html'));
});


// Handle registration
router.post('/register', registerUser);

// Handle login
router.post('/login', loginUser);

module.exports = router;
