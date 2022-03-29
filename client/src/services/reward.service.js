import axios from "axios";

function getUserReward() {
    const options = {
        method: 'GET',
        url: '/reward',
    };
    return axios(options);
}

function addUserReward({ reward }) {
    const options = {
        method: 'POST',
        url: '/reward',
        data: {
            reward,
        },
    };
    return axios(options);
}

export {
    getUserReward,
    addUserReward
}