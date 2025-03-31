const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require: true
    },
    productVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productVarients",
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('cart', cartSchema);