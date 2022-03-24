import { Navigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { useAuthContext } from './AuthProvider';

/**
 * In the case of protecting against unauthorized users (here: unauthenticated
 * users), the component will check whether the authentication token is present.
 * If it is present, the component will render its children. However, if it is
 * absent, the user gets a conditional redirect with React Router's declarative
 * Navigate component to the login page.
 */
const ProtectedRoute = ({ children }) => {
    const { token } = useAuthContext();
    /** Smart redirect
     * 'Remember' the location from where the redirect happened to the login
     * page. This useLocation hook grabs the current location before we redirect
     * the user.
     */
    const location = useLocation();

    /** Check if the token is expired
     * By checking if the token is expired before loading the protected
     * component, it prevents the fetch call to the server and the flash of the
     * protected component before an immediate redirect to the login screen.
     */
    if (token) {
        // need the substring only since the server adds "Bearer " in front
        const decodedToken = jwt_decode(token.substring(7,))
        
        // JWT expiry is in seconds, Date is in ms need to convert.
        if (decodedToken.exp < Date.now() / 1000) {
            // state={{ from: location }} is for smart redirect
            return <Navigate to='/login' replace state={{ from: location }}/>
        }
    } else {
        // state={{ from: location }} is for smart redirect
        return <Navigate to='/login' replace state={{ from: location }}/>
    }

    return children;
}

export default ProtectedRoute;