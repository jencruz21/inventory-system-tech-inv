const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "categories"
    }, 
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const ItemModel = mongoose.model("items", ItemSchema)

module.exports = ItemModel