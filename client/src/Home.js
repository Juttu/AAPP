import React, {useEffect} from "react";
import Login from "./components/auth/Login";
import {isAuthenticated} from "./components/auth/auth.utils";
import Referral from "./User/Referral";
import Register from "./User/Register";
import {Toast} from "primereact/toast";
import Reward from "./User/Reward";

function Home() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegistered, setIsRegistered] = React.useState(false);
    const ref = React.useRef(null);

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    return (
        <React.Fragment>
            <Toast ref={ref}/>
            <div className="flex flex-column mt-6">
                {!isLoggedIn && <Login onLoginSuccess={(isRegistered, toasts) => {
                    setIsLoggedIn(true)
                    ref.current.show(toasts);
                    setIsRegistered(isRegistered)
                }} />}
                {isLoggedIn && !isRegistered && <Register onRegistrationSuccess={(toasts) => {
                    ref.current.show(toasts);
                    setIsRegistered(true)
                }} />}
                {isLoggedIn && <Referral />}
                <Reward />
            </div>
        </React.Fragment>
    );

}

export default Home;