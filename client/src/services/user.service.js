import axios from "axios";

async function getUserDetails() {
  const options = {
    method: 'GET',
    url: '/user',
  };
  return axios(options);
}

async function registerUser({name, email}) {
    const options = {
        method: 'POST',
        url: `/user/registerUser/`,
        data: JSON.stringify({name, email})
    };
    return axios(options);
}

export {registerUser, getUserDetails};