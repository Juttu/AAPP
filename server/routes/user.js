const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');

router.post('/registerUser', async function (req, res, next) {
    const id = req.user._id;
    const {name, email} = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
        return next({
            status: 404,
            message: 'User not found'
        });
    }
    if (user.isRegistered) {
        return next({
            status: 400,
            message: 'User already registered'
        });
    }
    user.name = name;
    user.email = email;
    user.isRegistered = true;
    await user.save();
    return res.status(201).json(user);
});

router.get('/', async function (req, res, next) {
    const user = req.user;
    return res.status(200).json(user);
});

module.exports = router;
