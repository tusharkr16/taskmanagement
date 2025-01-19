const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log(token)
            const decoded = jwt.verify(token, "tusharkumar9871");
            req.user = await User.findById(decoded.id).select('-password');
            console.log(req.user);
            next()
        }
        catch (err) {
            res.status(401);
            throw new Error("Not authorized,token failed")
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorised, no token");
    }
})

module.exports = { protect };