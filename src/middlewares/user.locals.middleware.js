exports.userLocals = (req, res, next) => {
    if (req.url === "/inventory/login" || req.url === "/inventory/register") {
        return next()
    } 

    if (req.isAuthenticated()) {
        res.locals.id = req.user._id
        return next()
    } else {
        return next()
    }
}