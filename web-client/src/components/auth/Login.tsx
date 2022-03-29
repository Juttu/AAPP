import React, {useEffect} from "react";
import OtpInput from "components/auth/OtpInput";
import PhoneInput from "components/auth/PhoneInput";
import {useLocation} from "react-router-dom";
import AuthService from "services/auth.service";

function useQuery() {
  const {search} = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export interface ILoginProps {
  onLoginSuccess: () => void;
}

function Login({onLoginSuccess}: ILoginProps) {
  const [phoneInput, setPhoneInput] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  const [referrer, setReferrer] = React.useState<string | null>(null);
  const query = useQuery();
  const authService: AuthService = AuthService.Instance;

  useEffect(() => {
    if (query.get("referrer")) {
      setReferrer(query.get("referrer"));
    }
  }, [referrer, query]);

  const onPhoneSubmit = async (phone: string) => {
    const result = await authService.requestOTP({phone});
    if (!result) return;
    setPhone(phone);
    setPhoneInput(false);
  }

  const onOtpSubmit = async (otp: string) => {
    const result = await authService.verifyOTP({phone, otp, referrer});
    if (!result) return;
    onLoginSuccess();
  }

  return (
    <React.Fragment>
      {phoneInput && <PhoneInput onSubmit={onPhoneSubmit}/>}
      {!phoneInput && <OtpInput onSubmit={onOtpSubmit}/>}
    </React.Fragment>
  );
}

export default Login;