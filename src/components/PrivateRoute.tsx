import { Navigate } from 'react-router-dom';


interface PrivateRouteProps  {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = localStorage.getItem('authToken') !== null ? true : false
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
