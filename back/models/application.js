const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    appliant: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    motivation: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        default: false
    },
    offer: {
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
        required: true
    }

});


module.exports = mongoose.model('Application', applicationSchema);