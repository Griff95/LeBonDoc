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
    birthDate: {
        type: Date,
    },
    ads: [{
        type : mongoose.Types.ObjectId,
        ref: 'Ad'
    }],
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }],
    medicalField: {
        type: String,
    },
    presentation: {
        type: String
    },
    postalCode: {
        type: Number
    },
    city: {
        type: String
    },
    department: {
        type: String
    },
    state: {
        type: String
    },
    healthStructure: {
        name: {
            type: String
        },
        structureType: {
            type: String
        },
        location: {
            lat: { type: Number },
            lon: { type: Number },
            road: { type: String },
            numRoad: { type: String },
            city: { type: String },
            postalCode: { type: Number }
        }
    }
}, {
    // will include updateAt and createdAt fields
    timestamps: true
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);