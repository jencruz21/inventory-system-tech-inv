const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const CategoryModel = mongoose.model("categories", CategorySchema)

module.exports = CategoryModel