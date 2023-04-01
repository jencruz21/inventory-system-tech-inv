const path = require('path')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require(path.resolve(__dirname, '../models/user.model'))

const verify = async (email, password, cb) => {

    try {
        const user = await UserModel.findOne({ email: email })
        const comparePassword = await bcrypt.compareSync(password, user.password)

        if (!email || !password) {
            return cb(new Error("No Password or Email!"), null)
        } 

        if (!user) throw new Error("No User was found!")

        if (!comparePassword) {
            return cb(new Error("Password not matched!"), null)
        } else {
            return cb(null, user)
        }
    } catch (error) {
        return cb(error, null)
    }
}

const initialize = (passport) => {

    passport.use(new LocalStrategy({ usernameField: "email"}, verify));

    passport.serializeUser((user, cb) => { 
        return cb(null, user._id)
    })

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await UserModel.findById(id);
            if (user) {
                return cb(null, user);
            } else {
                return cb(null, false, { message: "No User Found :(" });
            }
        } catch (error) {
            return cb(error, null);
        }
    });
}

module.exports = initialize;