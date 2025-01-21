const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    mainCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainCategory',
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        require: true
    },
    productName: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('product', productSchema);