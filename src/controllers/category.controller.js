const path = require('path')
const joi = require('joi')
const CategoryModel = require(path.resolve(__dirname, '../models/category.model'))

/**
 * Add Category
 */

exports.createCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        return res.status(200).render('categories', {
            categories: categories
        })
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.storeCategory = (req, res) => {

    const categoryValidation = joi.object({
        category_name: joi.string().required()
    })

    const { error, value } = categoryValidation.validate(req.body)
    
    if (error) {
        return res.sendStatus(400)
    }

    const category = new CategoryModel({
        category_name: value.category_name
    })

    try {
        category.save()
        return res.status(200).redirect('/inventory')
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.findAllCategories = async (req, res) => {
    try {
        const response = await CategoryModel.find()
        return res.status(200).render('index', {
            categories: response
        })
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params
    
    try {
        await CategoryModel.findByIdAndDelete(id)
        return res.status(200).redirect(`/inventory/categories/create`)
    } catch (error) {

        return res.sendStatus(400)
    }
}