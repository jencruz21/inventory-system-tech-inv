exports.userLocals = (req, res, next) => {
    if (req.originalUrl === "/inventory/login" || req.originalUrl === "/inventory/register") {
        return next();
    } else {
        res.locals.id = req.user._id;
        res.locals.email = req.user.email;
        res.locals.first_name = req.user.fname;
        res.locals.last_name = req.user.lname;
        return next();
    }
}