import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutPage from '../pages/LogoutPage';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [navBackground, setNavBackground] = useState('bg-gray-800');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setNavBackground('bg-blue-900');
        } else {
            setNavBackground('bg-gray-800');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${navBackground} p-4 sticky top-0 z-50 transition-colors duration-300`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/login" className="text-white text-2xl font-bold">MyPhotoApp</Link>
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="text-gray-300 hover:text-white">Home</Link>
                    <LogoutPage/>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? '✖️' : '☰'}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-gray-700">
                    <Link to="/" className="block text-gray-300 hover:text-white p-2">Home</Link>
                <LogoutPage/>
                </div>
            )}
        </nav>
    );
};

export default Navbar;