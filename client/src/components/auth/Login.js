import React, {useEffect} from "react";
import OtpInput from "./OtpInput";
import PhoneInput from "./PhoneInput";
import {requestOTP, verifyOTP} from "services/auth.service";
import {Toast} from "primereact/toast";
import {useLocation} from "react-router-dom";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Login({ onLoginSuccess }) {
    const [phoneInput, setPhoneInput] = React.useState(true);
    const [phone, setPhone] = React.useState("");
    const [referrer, setReferrer] = React.useState(null);
    const query = useQuery();
    const ref = React.useRef();

    useEffect(() => {
        if (query.get("referrer")) {
            setReferrer(query.get("referrer"));
        }
    }, [referrer, query]);

    const onPhoneSubmit = async (phone) => {
        const response = await requestOTP({phone});
        setPhone(phone);
        if (response.status === 200) {
            setPhoneInput(false);
            ref.current.show({severity: 'success', summary: 'Success', detail: 'OTP sent to your phone'});
        }
    }

    const onOtpSubmit = async (otp) => {
        const response = await verifyOTP({phone, otp, referrer});
        if (response.status === 200) {
            const { referred, referrer } = response.data.data;
            const toasts = [{severity: 'success', summary: 'Success', detail: 'Login Successful'}];
            if (referrer) {
                if (referred) {
                    toasts.push({severity: 'success', summary: 'Success', detail: 'Referral Successful!'});
                } else {
                    toasts.push({severity: 'error', summary: 'Error', detail: 'Invalid referral code!'});
                }
            }
            localStorage.setItem('token', response.data.data.token);
            onLoginSuccess(response.data.isRegistered, toasts);
        }
    }

    return (
        <React.Fragment>
            <Toast ref={ref} />
            {phoneInput && <PhoneInput onSubmit={onPhoneSubmit}/>}
            {!phoneInput && <OtpInput onSubmit={onOtpSubmit}/>}
        </React.Fragment>
    );
}

export default Login;