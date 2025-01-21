const mongoose = require('mongoose')

const specialOfferSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    offerImage: {
        type: String,
        require: true
    },
    offerDiscount: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('specialoffers', specialOfferSchema);