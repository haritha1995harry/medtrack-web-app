const express = require('express');
const router = express.Router();
const { addMedication, getUpcomingMedications } = require('../controllers/medicationController');

router.post('/medications', addMedication);

router.get('/medications/upcoming/:userId', getUpcomingMedications);

module.exports = router;
