import React from 'react';

const LoadingPage: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid"></div>
                <p className="mt-6 text-2xl text-gray-700 font-semibold">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
