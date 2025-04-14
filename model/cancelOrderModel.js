const mongoose = require('mongoose')

const cancelOrderSchema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    reasonForCancellationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reasonForCancellation',
        required: true
    },
    cancelOrderStatus: {
        type: String,
        enum: ["Refund Initiated", 'Refund In Progresss', 'Refund Credited'],
        default: 'Refund Initiated'
    },
    comments: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('cancelOrder', cancelOrderSchema)