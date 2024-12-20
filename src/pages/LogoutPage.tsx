import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = async () => {
        const userConfirmed = window.confirm("Are you sure you want to log out?");

        if (!userConfirmed) return;

        const tokenKey = 'authToken';
        if (localStorage.getItem(tokenKey)) {
            localStorage.removeItem(tokenKey);
        }

        try {
            await signOut(auth);
            console.log("User logged out successfully");
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
            Log Out
        </button>
    );
};

export default LogoutPage;
