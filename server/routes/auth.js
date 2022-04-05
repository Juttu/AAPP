const express = require('express');
const router = express.Router();
const hotp = require('otplib').hotp;
const UserModel = require('../models/user.model');
const {F2S_API_KEY} = require("../common/config");
const {createJwtToken} = require("../utils/token.util");
const RewardModel = require("../models/reward.model");
const axios = require("axios");

async function updateReferral(referrer, referee) {
    const user = await UserModel.findById(referrer);
    if (!user) {
        return false;
    }
    let rewardObj = await RewardModel.findOne({ user: referrer });
    if (!rewardObj) {
        rewardObj = new RewardModel({
            user: referrer,
            rewards: [],
            referees: []
        });
    }
    rewardObj.referees.push(referee);
    await rewardObj.save();
    return true;
}

function generateOTP(user) {
    return hotp.generate(user.phone.number, user.phone.counter + 1);
}

async function sendOTP(user) {
    const otp = generateOTP(user);
    // fast2sms doesn't need country code
    const phone = user.phone.number.substring(3);
    const config = {
        method: 'POST',
        url: 'https://www.fast2sms.com/dev/bulkV2',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': F2S_API_KEY
        },
        data: {
            "route": "v3",
            "sender_id": "payBIS",
            "message": `Your 6-digit OTP is ${otp} for early access to the app.`,
            "numbers": `${phone}`
        }
    }
    return axios(config);
}

router.post('/requestOTP', async (req, res) => {
    const {phone} = req.body;
    let user = await UserModel.findOne({"phone.number": phone});
    if (!user) {
        user = new UserModel({phone: {number: phone}});
    }
    try {
        await sendOTP(user);
        user.phone.counter++;
        await user.save();
        return res.sendStatus(201);
    } catch (e) {
        return res.sendStatus(500);
    }
});

router.post('/verifyOTP', async (req, res, next) => {
    const {phone, otp, referrer} = req.body;
    let user = await UserModel.findOne({"phone.number": phone});
    if (!user) {
        return next({
            status: 404,
            message: 'User does not exist'
        });
    }
    const counter = user.phone.counter;
    const verified = hotp.check(otp, user.phone.number, counter);
    if (!verified) {
        return next({
            status: 400,
            message: 'OTP is invalid'
        });
    }
    let referred = false;
    // refer only on first successful login
    if (referrer && user.phone.counter === 1) {
        referred = await updateReferral(referrer, user._id);
    }
    return res.status(201).json({
        token: createJwtToken({_id: user._id}),
        isReferral: !!referrer,
        referralSuccess: referred,
        isRegistered: user.isRegistered
    });
});

module.exports = router;
