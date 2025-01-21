const mongoose = require('mongoose')

const mainCategorySchema = mongoose.Schema({
    mainCategoryName: {
        type: String,
        require: true
    },
    mainCategoryImage: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('mainCategory', mainCategorySchema);