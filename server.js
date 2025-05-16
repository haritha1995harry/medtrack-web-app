const express = require("express");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 
const medicationRoutes = require("./routes/medicationRoutes");
const caregiverRoutes = require("./routes/caregiverRoutes");
require('dotenv').config();
const { startMedicationScheduler } = require('./utils/medicationScheduler');


const app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', userRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/caregivers', caregiverRoutes);

startMedicationScheduler();

// MongoDB connection
mongoose.connect('mongodb+srv://sathinchamikara:yWge0jeMz7EDDLyo@cluster0.ggggzyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
