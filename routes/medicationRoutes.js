const express = require('express');
const router = express.Router();
const { addMedication } = require('../controllers/medicationController');

router.post('/medications', addMedication);

module.exports = router;
