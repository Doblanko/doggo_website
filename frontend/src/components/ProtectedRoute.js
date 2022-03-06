import { Navigate, useLocation } from 'react-router-dom';
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

    // state={{ from: location }} is for smart redirect
    if (!token) {
        return <Navigate to='/login' replace state={{ from: location }}/>
    }

    return children;
}

export default ProtectedRoute;