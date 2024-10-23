import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">MyPhotoApp</Link>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/user" className="text-gray-300 hover:text-white">User</Link>
                    <Link to="/user-albums/5" className="text-gray-300 hover:text-white">Albums</Link>
                    <Link to="/albums/:albumId" className="text-gray-300 hover:text-white">Photos</Link>
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
                    <Link to="/user" className="block text-gray-300 hover:text-white p-2">User</Link>
                    <Link to="/user-albums/5" className="block text-gray-300 hover:text-white p-2">Albums</Link>
                    <Link to="/albums/:albumId" className="block text-gray-300 hover:text-white p-2">Photos</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
