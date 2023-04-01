const path = require('path')
const mongoose = require('mongoose')
const joi = require('joi')
const ItemModel = require(path.resolve(__dirname, '../models/item.model'))
const CategoryModel = require(path.resolve(__dirname, '../models/category.model'))

exports.createItem = async (req, res) => {
    try {
        console.log(req.url)
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
        item_name: joi.string().required(),
        category: joi.string().required(),
        price: joi.number().required()
    })

    const { error, value } = itemValidation.validate(req.body)

    if (error) {
        console.log(error);
        return res.sendStatus(400)
    }

    const item = new ItemModel({
        item_name: value.item_name,
        category: new mongoose.Types.ObjectId(value.category),
        price: value.price
    })

    try {
        await item.save()
        return res.status(200).redirect(`/inventory/items/category/${value.category}`)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

exports.findItemsByCategory = async (req, res) => {
    try {
        const { id } = req.params
        
        const items = await ItemModel.find({
            category: new mongoose.Types.ObjectId(id)
        }).populate('category')

        return res.status(200).render('items_page', {
            items: items
        })
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

exports.editItem = async (req, res) => {
    const { id } = req.params
    
    try {
        const item = await ItemModel.findById(id)
        const categories = await CategoryModel.find()
        return res.status(200).render('edit_item', {
            item: item,
            categories: categories
        })
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

exports.updateItem = async (req, res) => {
    const { id } = req.params

    const itemValidation = joi.object({
        item_name: joi.string().required(),
        category: joi.string().required(),
        price: joi.number().required()
    })

    const { error, value } = itemValidation.validate(req.body)

    if (error) {
        console.log(error);
        return res.sendStatus(400)
    }
    
    try {
            await ItemModel.findByIdAndUpdate(id, {
            item_name: value.item_name,
            category: new mongoose.Types.ObjectId(value.category),
            price: value.price
        })

        return res.status(200).redirect(`/inventory/items/category/${value.category}`)
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.deleteItem = async (req, res) => {
    const { id } = req.params
    
    try {
        const item = await ItemModel.findByIdAndDelete(id)
        const category_id = item.category
        return res.status(200).redirect(`/inventory/items/category/${category_id}`)
    } catch (error) {
        return res.sendStatus(400)
    }
}