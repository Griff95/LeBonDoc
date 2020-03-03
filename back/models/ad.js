const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    healthStructure : {
        type: String
    },
    dateDebut : {
        type: Date,
        required: true
    },
    dateFin : {
        type: Date
    },
    medicalField: {
        type: String,
    },
    applications : [{
        type: mongoose.Types.ObjectId,
        ref: 'Application'
    }],
    isAvailable : {
        type: Boolean
    }
}, {
    // will include updateAt and createdAt
    timestamps: true
});

module.exports = mongoose.model('Ad', adSchema);