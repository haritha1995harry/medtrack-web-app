const express = require('express');
const router = express.Router();
const { addMedication, getUpcomingMedications, getAllMedicationsByUser } = require('../controllers/medicationController');
const { addMedicationLog, getTodaysMedicationsByStatus } = require('../controllers/medicationLogController');

router.post('/', addMedication);

router.get('/user/:userId', getAllMedicationsByUser);

router.get('/upcoming/:userId', getUpcomingMedications);

router.post('/log', addMedicationLog);

router.get('/logs/today/:userId/:status', getTodaysMedicationsByStatus);

module.exports = router;
