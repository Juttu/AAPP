import axios from "axios";
import {MessageService} from "services/message.service";
import AuthService from "services/auth.service";
import {getRecoil, resetRecoil, setRecoil} from "recoil-nexus";
import {authState} from "recoil/atoms";

export class UserService {

  private static _instance: UserService;
  private messageService: MessageService = MessageService.Instance;
  private authService: AuthService = AuthService.Instance;

  public static get Instance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }
    return UserService._instance;
  }

  getCurrentUser = async () => {
    if (!localStorage.getItem("token")) {
      setTimeout(() => {
        resetRecoil(authState);
      }, 0);
      return null;
    }
    const options = {
      method: 'GET',
      url: '/user',
    };
    try {
      const response = await axios.get(options.url);
      const { data } = response;
      const auth = getRecoil(authState);
      setRecoil(authState, {
        ...auth,
        isRegistered: true,
      })
      return data;
    } catch (error: any) {
      this.messageService.addMessage({
        severity: 'error',
        summary: 'Error',
        detail: error.response.message
      })
      this.authService.logOut();
      return null;
    }
  }

  registerUser = async ({name, email}: {name: string, email: string}) => {
    const options = {
      method: 'POST',
      url: `/user/registerUser/`,
      data: JSON.stringify({name, email})
    };
    try {
      await axios.post(options.url, options.data);
      this.messageService.addMessage({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile updated successfully'
      });
      return true;
    } catch (error: any) {
      this.messageService.addMessage({
        severity: 'error',
        summary: 'Error',
        detail: error.response.message
      })
      return false;
    }
  }

}

export default UserService;

// async function getCurrentUser() {
//   const options = {
//     method: 'GET',
//     url: '/user',
//   };
//   return axios.get(options.url);
// }
//
// async function registerUser({name, email}: {name: string, email: string}) {
//     const options = {
//         method: 'POST',
//         url: `/user/registerUser/`,
//         data: JSON.stringify({name, email})
//     };
//     return axios.post(options.url, options.data);
// }
//
// export {registerUser, getCurrentUser};