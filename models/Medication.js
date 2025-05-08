const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sicknessName: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date 
    },
    occurrenceDays: { 
        type: [String], 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'All Days'],
        required: true 
    },
    occurrenceTimes: { 
        type: [String],  
        validate: {
            validator: function (times) {
                return times.every(time => /^([01]\d|2[0-3]):[0-5]\d$/.test(time));
            },
            message: 'Invalid time format. Use HH:mm (24-hour format).'
        },
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

medicationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Medication', medicationSchema);
