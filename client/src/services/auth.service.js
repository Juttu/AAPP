import axios from "axios";

async function requestOTP({phone}) {
    const options = {
        method: 'POST',
        url: `/auth/requestOTP/`,
        data: JSON.stringify({
            phone
        })
    };
    return axios(options);
}

async function verifyOTP({phone, otp, referrer}) {
    const options = {
        method: 'POST',
        url: `/auth/verifyOTP/`,
        data: JSON.stringify({phone, otp, referrer})
    };
    return axios(options);
}

export {verifyOTP, requestOTP};