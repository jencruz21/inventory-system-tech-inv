const path = require('path')
const mongoose = require('mongoose')
const joi = require('joi')
const ItemModel = require(path.resolve(__dirname, '../models/item.model'))
const CategoryModel = require(path.resolve(__dirname, '../models/category.model'))

exports.createItem = async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        return res.status(200).render('add_item', {
            categories: categories
        })
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.storeItem = async (req, res) => {
    const itemValidation = joi.object({
        name: joi.string().required(),
        category: joi.string().required()
    })

    const { error, value } = itemValidation.validate(req.body)

    if (error) {
        return res.sendStatus(400)
    }

    const item = new ItemModel({
        name: value.name,
        category: mongoose.Types.ObjectId(value.category)
    })

    try {
        await item.save()
        return res.status(200).redirect(`/items/${value.category}`)
    } catch (error) {
        return res.sendStatus(400)
    }
}