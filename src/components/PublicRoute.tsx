import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
    redirectPath?: string;
}

const PublicRoute: FC<PublicRouteProps> = ({ redirectPath = '/user' }) => {
    const authToken = localStorage.getItem('authToken');

    return authToken ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default PublicRoute;
