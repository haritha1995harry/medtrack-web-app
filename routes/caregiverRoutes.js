const express = require('express');
const {
    registerCaregiver,
    getCaregiversByUser,
    getCaregiverById,
    updateCaregiver,
    deleteCaregiver,
    getAllCaregivers  // <- import the new function
} = require('../controllers/caregiverController');

const router = express.Router();

router.get('/', getAllCaregivers);  // <-- add this line for all caregivers
router.post('/register', registerCaregiver);
router.get('/user/:userId', getCaregiversByUser);
router.get('/:id', getCaregiverById);
router.put('/:id', updateCaregiver);
router.delete('/:id', deleteCaregiver);

module.exports = router;
