import {atom} from "recoil";
import {IAuthState, IPrimeMessage} from "interfaces";
import {isAuthenticated} from "utils/auth.utils";

export const authState = atom<IAuthState>({
    key: "AuthState",
    default: {
        isLoggedIn: isAuthenticated(),
        isRegistered: false,
        token: localStorage.getItem("token") || null,
    } as IAuthState
})

export const messageState = atom<IPrimeMessage[]>({
    key: "MessageState",
    default: [] as IPrimeMessage[],
})