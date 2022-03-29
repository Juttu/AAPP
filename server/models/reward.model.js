const mongoose = require('mongoose');
const UserModel = require('./user.model');

const rewardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
        unique: true
    },
    rewards: [{
        type: String,
        required: true,
    }],
    referees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    }]
})

module.exports = mongoose.model("Reward", rewardSchema);