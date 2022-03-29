import UserService from "services/user.service";
import {selector} from "recoil";

export const currentUserQuery = selector({
  key: "CurrentUserQuery",
  get: async () => {
    const userService = UserService.Instance;
    try {
      const user = await userService.getCurrentUser();
      if (!user) {
        return ;
      }
      return user;
    } catch (e) {
      return null;
    }
  },
});