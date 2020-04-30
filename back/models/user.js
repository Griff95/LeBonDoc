const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
    },
    postalCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    region: {
        type: String
    },
    medicalField: {
        type: String,
    },
    presentation: {
        type: String
    },
    healthStructure: {
        name: {
            type: String
        },
        structureType: {
            type: String
        },
        //lat: { type: Number },
        //lon: { type: Number },
        //road: { type: String },
        //numRoad: { type: String },
        city: { type: String },
        department: { type: String },
        postalCode: { type: Number }
    },
    ads: [{
        type : mongoose.Types.ObjectId,
        ref: 'Ad'
    }],
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }],
    chats: [{
        type: mongoose.Types.ObjectId,
        ref: 'AdChat'
    }]
}, {
    // will include updateAt and createdAt fields
    timestamps: true
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
