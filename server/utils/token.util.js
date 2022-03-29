const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../common/config");

exports.createJwtToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

exports.verifyJwtToken = (token, next) => {
    try {
        const { _id } = jwt.verify(token, JWT_SECRET);
        return { _id };
    } catch (err) {
        next({ status: 401, message: err.message });
    }
};