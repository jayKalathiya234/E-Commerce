const mongoose = require('mongoose')

const productVariantSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    currentPrice: {
        type: String,
        require: true
    },
    originalPrice: {
        type: String,
        require: true
    },
    discount: {
        type: String,
        require: true
    },
    specifications: {
        type: mongoose.Schema.Types.Mixed
    },

    fabric: {
        type: String,
        require: true
    },
    washCare: {
        type: String,
        require: true
    },
    work: {
        type: String,
        require: true
    },
    manufacturingDetails: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    occasion: {
        type: String,
        require: true
    },
    countryOrigin: {
        type: String,
        require: true
    },

    modelName: {
        type: String,
        require: true
    },
    operatingSystem: {
        type: String,
        require: true
    },
    memoryStorageCapacity: {
        type: String,
        require: true
    },
    cameraAndVideo: {
        type: String,
        require: true
    },
    colour: {
        type: String,
        require: true
    },
    screenSize: {
        type: String,
        require: true
    },
    browserType: {
        type: String,
        require: true
    },
    frontCamera: {
        type: String,
        require: true
    },

    volume: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    ingredient: {
        type: String,
        require: true
    },
    skinType: {
        type: String,
        require: true
    },
    benefits: {
        type: String,
        require: true
    },
    usage: {
        type: String,
        require: true
    },
    expiryDate: {
        type: String,
        require: true
    },
    warning: {
        type: String,
        require: true
    },


    brand: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    processor: {
        type: String,
        require: true
    },
    ram: {
        type: String,
        require: true
    },
    storage: {
        type: String,
        require: true
    },
    displaySize: {
        type: String,
        require: true
    },
    displayResolution: {
        type: String,
        require: true
    },
    cameraRear: {
        type: String,
        require: true
    },
    cameraFront: {
        type: String,
        require: true
    },
    batteryCapacity: {
        type: String,
        require: true
    },
    connectivity: {
        type: String,
        require: true
    },
    warranty: {
        type: String,
        require: true
    },


    material: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    warranty: {
        type: String,
        require: true
    },
    safetyFeatures: {
        type: String,
        require: true
    },

    // material
    capacity: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    wheels: {
        type: String,
        require: true
    },
    lockType: {
        type: String,
        require: true
    },
    waterProof: {
        type: String,
        require: true
    },
    // warranty

    // Elecronicas

    //material
    // capacity
    powerConsumption: {
        type: String,
        require: true
    },
    // warranty
    features: {
        type: String
    },
    // usage
    storage: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    colorName: {
        type: String,
        require: true
    },
    images: [{
        type: String,
        require: true
    }],
    stockStatus: {
        type: String,
        enum: ["true", 'false'],
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('productvariant', productVariantSchema)