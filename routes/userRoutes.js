const express = require('express');
const path = require('path');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Serve pages
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/registration-page.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login-page.html'));
});

router.get('/dashboard', (req, res) => {
    if (!req.session.userId) return res.redirect('/login?error=Please login first');
    res.sendFile(path.join(__dirname, '../public/views/dashboard.html'));
});

router.get('/caregivers', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/caregiver.html'));
});

router.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/settings.html'));
});
router.get('/medications', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/medication.html'));
});

// Post routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
