const path = require('path')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const initialize = require(path.resolve(__dirname, '../config/passport.config'))

require('dotenv').config()

// CONTROLLERS
const CategoryController = require(path.resolve(__dirname, '../controllers/category.controller'))
const ItemController = require(path.resolve(__dirname, '../controllers/item.controller'))
const UserController = require(path.resolve(__dirname, '../controllers/user.controller'))

// MIDDLEWARES
const checkAuth = require(path.resolve(__dirname, '../middlewares/check.auth.middleware'))
const userLocals = require(path.resolve(__dirname, '../middlewares/user.locals.middleware'))

initialize(passport)

router.use(session({
    secret: process.env.SECRET_TEXT,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 60 }
}))

router.use(passport.authenticate('session'))
router.use(cookieParser())
router.use(userLocals.userLocals)

// LOGIN
// LOGIN USER
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).redirect('/inventory')
    } else {
        return res.status(200).render('login')
    }
})

// 
router.post('/login', passport.authenticate('local', {
    successRedirect: '/inventory',
    failureRedirect: '/inventory/login'
}))

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (!err) {
            return res.redirect('/inventory/login')
        }
    });
})

// USER CHANGE PASSWORD
router.post('/user/password/:id', UserController.userChangePassword)

// USERS
// CREATE USER (REGISTER PAGE) 
router.get('/register', UserController.createUser)

// STORE USER
router.post('/user/store', UserController.storeUser)

// SHOW USER
router.get('/user/show/:id', checkAuth.checkAuth, UserController.showUser)

// EDIT USER
router.get('/user/edit/:id', checkAuth.checkAuth, UserController.editUser)

// UPDATE USER
router.post('/user/update/:id', UserController.updateUser)


// CATEGORIES or HOME
router.get('/', checkAuth.checkAuth, CategoryController.findAllCategories)

// ITEMS PAGE
router.get('/items/category/:id', checkAuth.checkAuth, ItemController.findItemsByCategory)

// ITEM EDIT PAGE
router.get('/items/edit/:id', checkAuth.checkAuth, ItemController.editItem)

// ITEM UPDATE
router.post('/items/update/:id', ItemController.updateItem)

// DELETE
router.get('/items/delete/:id', checkAuth.checkAuth, ItemController.deleteItem)

// CREATE ITEM
router.get('/items/create', checkAuth.checkAuth, ItemController.createItem)

// STORE ITEM
router.post('/items/store', ItemController.storeItem)


// CREATE CATEGORY
router.get('/categories/create', checkAuth.checkAuth, CategoryController.createCategory)

// STORE CATEGORY
router.post('/categories/store', CategoryController.storeCategory)

// EDIT CATEGORY
router.get('/categories/edit/:id', checkAuth.checkAuth, CategoryController.editCategory)

// UPDATE CATEGORY
router.post('/categories/update/:id', CategoryController.updateCategory)

// DELETE CATEGORY
router.get('/categories/delete/:id', checkAuth.checkAuth, CategoryController.deleteCategory)

module.exports = router