import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import { ROUTES } from '../constants';
import { isAuthenticated } from '../components/auth/auth.utils';

function PrivateRoute({ children, ...rest }) {
    let location = useLocation();

    if (!isAuthenticated()) {
        localStorage.removeItem('token');
        return <Navigate to={ROUTES.HOME} state={{ from: location }} />;
    }

    return children;
}

export default PrivateRoute;