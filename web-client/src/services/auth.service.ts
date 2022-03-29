import {setRecoil} from "recoil-nexus";
import {authState} from "recoil/atoms";
import {MessageService} from "services/message.service";
import axios from "axios";
import jwt_decode from "jwt-decode";


export class AuthService {

    private static _instance: AuthService;
    private messageService: MessageService = MessageService.Instance;

    public static get Instance(): AuthService {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }
        return AuthService._instance;
    }

    requestOTP = async ({phone}: { phone: string }): Promise<any> => {
        const options = {
            method: "POST",
            url: `/auth/requestOTP/`,
            data: JSON.stringify({
                phone
            })
        };
        try {
            await axios.post(options.url, options.data);
            this.messageService.addMessage({
                severity: 'success',
                summary: 'OTP Request',
                detail: 'OTP has been sent to your phone number'
            })
            return true;
        } catch (e) {
            this.messageService.addMessage({
                severity: 'error',
                summary: 'Authentication Error',
                detail: 'OTP could not be sent'
            })
            return false;
        }
    }

    verifyOTP = async ({
        phone,
        otp,
        referrer
    }: { phone: string; otp: string; referrer: string | null }): Promise<any> => {
        const options = {
            method: "POST",
            url: `/auth/verifyOTP/`,
            data: JSON.stringify({phone, otp, referrer})
        };
        try {
            const response = await axios.post(options.url, options.data);
            const { data } = response;
            localStorage.setItem('token', data.token);
            this.messageService.addMessage({
                severity: 'success',
                summary: 'Success',
                detail: 'OTP verified successfully'
            });
            setRecoil(authState, {
                isLoggedIn: true,
                isRegistered: data.isRegistered,
                token: data.token
            });
            return true;
        } catch (e) {
            this.messageService.addMessage({
                severity: 'error',
                summary: 'Authentication Error',
                detail: 'OTP could not be verified'
            });
            this.logOut();
            return false;
        }
    }

    isAuthenticated = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token) as any;
            return decoded.exp >= Date.now() / 1000;
        }
        return false;
    }

    logOut = () => {
        localStorage.removeItem('token');
        setRecoil(authState, {
            isLoggedIn: false,
            isRegistered: false,
            token: undefined
        });
    }


}

export default AuthService;