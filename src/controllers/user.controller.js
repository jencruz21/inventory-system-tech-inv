const path = require('path')
const bcrypt = require('bcrypt')
const joi = require('joi')
const UserModel = require(path.resolve(__dirname, '../models/user.model'))

exports.showUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserModel.findById(id)
        return res.status(200).render('user_profile', {
            user: user
        })
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.createUser = (req, res) => {
    return res.status(200).render('register')
}

exports.storeUser = async (req, res) => {
    const userValidation = joi.object({
        fname: joi.string().required(),
        lname: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().min(8).required(),
    })

    const { error, value } = userValidation.validate(req.body)
    
    if (error) {
        return res.sendStatus(400)
    }

    try {
        const password = await bcrypt.hashSync(value.password, 10)
    
        const user = new UserModel({
            fname: value.fname,
            lname: value.lname,
            email: value.email,
            password: password
        })   

        await user.save()

        return res.status(200).redirect('/inventory/login')
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.editUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserModel.findById(id)
        return res.status(200).render('edit_user_profile', {
            user: user
        })
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params

    const userValidation = joi.object({
        fname: joi.string().required(),
        lname: joi.string().required(),
        email: joi.string().required()
    })

    const { error, value } = userValidation.validate(req.body)
    
    if (error) {
        return res.sendStatus(400)
    }

    try {
    
        await UserModel.findByIdAndUpdate(id, {
            fname: value.fname,
            lname: value.lname,
            email: value.email,
        })

        return res.status(200).redirect(`/inventory/user/show/${id}`)
    } catch (error) {
        return res.sendStatus(400)
    }
}

exports.userChangePassword = async (req, res) => {
    const { id } = req.params

    const passwordValidation = joi.object({
        current: joi.string().min(8).required(),
        new: joi.string().min(8).required()
    })

    const { error, value } = passwordValidation.validate(req.body)

    if (error) {
        return res.sendStatus(400)
    }

    if (value.current !== value.new) {
        req.flash('error', 'Password does not match with your new')
        return res.status(400).redirect(`/inventor/user/password/${id}`)
    }

    try {
        const user = await UserModel.findById(id)
        const current_password = bcrypt.hashSync(value.current, 10)
        const new_password = bcrypt.hashSync(value.new, 10)

        if (user.password === current_password) {
            await UserModel.findByIdAndUpdate(id, {
                password: new_password
            })

            return res.status(200).redirect(`/inventory/user/show/${id}`)
        } else {
            req.flash('error', 'current password does not match with your previous one')
            return res.status(400).redirect(`/inventor/user/password/${id}`)
        }

    } catch (error) {
        return res.sendStatus(400)
    }
}
