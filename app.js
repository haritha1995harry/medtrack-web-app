const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const medicationRoutes = require('./routes/medicationRoutes'); // Add your route files
const caregiverRoutes = require('./routes/caregiverRoutes');
const { startMedicationScheduler } = require('./utils/medicationScheduler');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/', userRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/caregivers', caregiverRoutes);

// MongoDB
mongoose.connect('mongodb://localhost:27017/medtrackDB');
mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

// Start medication reminders
startMedicationScheduler();

module.exports = app;
