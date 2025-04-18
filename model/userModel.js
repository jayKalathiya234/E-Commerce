const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobileNo: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    active: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('user', userSchema);