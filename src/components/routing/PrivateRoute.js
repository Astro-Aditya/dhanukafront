import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom';


function PrivateRoute({ children }) {

    const authenticated = useSelector(state => state.auth.isAuthenticated)
    if (!authenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" />
    }

    return children;
}

export default PrivateRoute
