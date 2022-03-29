const User = require("../models/user.model")
const {verifyJwtToken} = require("../utils/token.util")

module.exports = async (req, res, next) => {
    try {
        // check for auth header from client
        const header = req.headers.authorization

        if (!header) {
            return next({status: 403, message: "Auth header is missing"})
        }

        // verify  auth token
        const token = header.split("Bearer ")[1]

        if (!token) {
            return next({status: 403, message: "Auth token is missing"})
        }

        const { _id } = verifyJwtToken(token, next);

        if (!_id) {
            return next({status: 403, message:  "Incorrect token"})
        }

        const user = await User.findById(_id);
        if (!user) {
            return next({status: 404, message: "User not found"})
        }

        req.user = user;

        next()
    } catch (err) {
        next(err)
    }
}
