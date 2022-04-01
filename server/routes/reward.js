const express = require('express');
const router = express.Router();
const RewardModel = require('../models/reward.model');

const remainingRewards = (rewardObj) => {
    if (!rewardObj) {
        return 1;
    }
    const rewardsCount = rewardObj.rewards.length;
    const referralsCount = rewardObj.referees.length;
    return referralsCount - rewardsCount + 1;
}

const isEligibleForReward = (rewardObj) => {
    return remainingRewards(rewardObj) >= 1;

}

router.get('/', async (req, res) => {
    const user = req.user;
    const rewardObj = await RewardModel.findOne({
        user: user._id
    });
    res.status(200).json({
        isEligible: isEligibleForReward(rewardObj),
        rewardObj: rewardObj
    });
});

router.get('/remaining', async (req, res) => {
    const user = req.user;
    const rewardObj = await RewardModel.findOne({
        user: user._id
    });
    res.status(200).json({
        remainingRewards: remainingRewards(rewardObj)
    });
});

router.post('/', async (req, res, next) => {
    const user = req.user;
    const { reward } = req.body;
    let rewardObj = await RewardModel.findOne({
        user: user._id
    });
    if (!rewardObj) {
        rewardObj = new RewardModel({
            user: user._id,
            rewards: [],
            referees: []
        });
    }
    const isEligible = isEligibleForReward(rewardObj);
    if (!isEligible) {
        return res.status(400).json({
            message: 'Send a referral to earn more rewards!',
        });
    }
    rewardObj.rewards.push(reward);
    await rewardObj.save();
    res.status(201).json({
        rewardObj,
    });
});

module.exports = router;
