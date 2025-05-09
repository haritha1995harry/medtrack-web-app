const express = require('express');
const router = express.Router();
const { addMedication, getUpcomingMedications } = require('../controllers/medicationController');
const { addMedicationLog } = require('../controllers/medicationLogController');

router.post('/medications', addMedication);

router.get('/medications/upcoming/:userId', getUpcomingMedications);

router.post('/medications/log', addMedicationLog);

module.exports = router;
