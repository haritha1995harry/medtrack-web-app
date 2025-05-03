const express = require('express');
const path = require('path');
const router = express.Router();

// Serve registration page
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/registration-page.html'));
});

module.exports = router;
