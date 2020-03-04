const mongoose = require('mongoose');

const adChatSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ad: {
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
        required: true
    },
    msg: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        msg: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    }]
}, {
    // will include updateAt and createdAt fields
    timestamps: true
});


module.exports = mongoose.model('AdChat', adChatSchema);