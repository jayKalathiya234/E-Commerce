const mongoose = require('mongoose')

const returnOrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        require: true
    },
    reasonForReturn: {
        type: String,
        require: true
    },
    mobileNo: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    returnOrderStatus: {
        type: String,
        enum: ['initiated', 'PickedUp', "Recived", "Refund Initiated", "Refund Credited"],
        default: 'initiated'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('returnOrder', returnOrderSchema)