const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    advertiser: {
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
    medicalField: {
        type: String,
        required: true
    },
    adType: {
        type: String,
        required: true
    },
    retrocession : {
        type: Number
    },
    isAvailable : {
        type: Boolean
    },
    healthStructure: {
        name: {
            type: String,
            required: true
        },
        structureType: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        }
    }
}, {
    // will include updateAt and createdAt
    timestamps: true
});

module.exports = mongoose.model('Ad', adSchema);