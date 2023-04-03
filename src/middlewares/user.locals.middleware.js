exports.userLocals = (req, res, next) => {
    if (req.url === "/inventory/login" || req.url === "/inventory/register") {
        return next()
    } 

    if (req.isAuthenticated()) {
        res.locals.id = req.user._id
        res.locals.email = req.user.email
        res.locals.fname = req.user.fname
        res.locals.lname = req.user.lname
        return next()
    } else {
        return next()
    }
}