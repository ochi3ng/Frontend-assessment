import React from 'react';

const LandingPage = () => {

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-semibold text-center">
                Welcome to Our Photos App
            </h1>
            {/* <p className="text-center text-lg mb-4">
                Please log in to continue
            </p> */}
            {/* <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out">
                Login
            </button> */}
        </div>
    );
};

export default LandingPage;
