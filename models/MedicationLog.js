const mongoose = require('mongoose');

const medicationLogSchema = new mongoose.Schema({
    medicationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Medication', 
        required: true 
    },
    occurrenceTime: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['taken', 'missed'], 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


medicationLogSchema.index({ medicationId: 1, occurrenceTime: 1 }, { unique: true });

module.exports = mongoose.model('MedicationLog', medicationLogSchema);
