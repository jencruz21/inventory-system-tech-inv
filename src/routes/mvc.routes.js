const path = require('path')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const session = require('express-session')

// CONTROLLERS
const CategoryController = require(path.resolve(__dirname, '../controllers/category.controller'))
const ItemController = require(path.resolve(__dirname, '../controllers/item.controller'))
const UserController = require(path.resolve(__dirname, '../controllers/user.controller'))

// LOGIN
// LOGIN USER
router.get('/login', (req, res) => {
    return res.status(200).send('ITEMS PAGE')
})

// 
router.post('/login', (req, res) => {
    return res.status(200).send('ITEMS PAGE')
})

router.get('/logout', (req, res) => {
    return res.status(200).send('ITEMS PAGE')
})

// USERS
// CREATE USER (REGISTER PAGE) 
router.get('/user/create', (req, res) => {
    return res.status(200).send('USERS CREATE PAGE')
})

// STORE USER
router.post('/user/store', (req, res) => {
    return res.status(200).send('USERS STORE PAGE')
})


// CATEGORIES or HOME
router.get('/', CategoryController.findAllCategories)

// ITEMS PAGE
router.get('/items/:category', (req, res) => {
    return res.status(200).send('ITEMS PAGE')
})

// ITEM EDIT PAGE
router.get('/items/edit/:id', (req, res) => {
    return res.status(200).send('ITEMS EDIT PAGE')
})

// ITEM UPDATE
router.post('/items/update/:id', (req, res) => {
    return res.status(200).send('ITEMS UPDATE')
})

// ITEM PAGE
router.get('/items/:id', (req, res) => {
    return res.status(200).send('ITEM PAGE')
})

// DELETE
router.get('/items/delete/:id', (req, res) => {
    return res.status(200).send('ITEMS DELETE PAGE')
})

// CREATE ITEM
router.get('/items/create', ItemController.createItem)

// STORE ITEM
router.post('/items/store', ItemController.storeItem)


// CREATE CATEGORY
router.get('/categories/create', CategoryController.createCategory)

// STORE CATEGORY
router.post('/categories/store', CategoryController.storeCategory)

// DELETE CATEGORY
router.get('/categories/delete/:id', (req, res) => {
    return res.status(200).send('ITEMS PAGE')
})

module.exports = router