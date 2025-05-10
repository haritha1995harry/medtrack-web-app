const express = require('express');
const path = require('path');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Serve registration page
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/registration-page.html'));
});


// Serve dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/dashboard.html'));
});


// Handle form submission
router.post('/register', registerUser);

// Handle login
router.post('/login', loginUser);

module.exports = router;
