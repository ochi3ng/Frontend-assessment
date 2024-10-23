// import React from 'react';

// const LandingPage = () => {

//     return (
//         <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-semibold text-center">
//                 Welcome to Our Photos App
//             </h1>
//             {/* <p className="text-center text-lg mb-4">
//                 Please log in to continue
//             </p> */}
//             {/* <button
//                 onClick={() => navigate('/login')}
//                 className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out">
//                 Login
//             </button> */}
//         </div>
//     );
// };

// export default LandingPage;



import React from 'react';

const LandingPage = () => {
    return (
        <div className="landing bg-hero-pattern bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-blue-700">
            <header className="landing-header text-center space-y-6 px-4 sm:px-6 md:px-8 lg:px-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">Welcome to Album Manager</h1>
                <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                    Manage your photos and albums effortlessly.
                </p>
                <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                    This application allows users to browse albums, view photos, and manage their own collections easily.
                </p>
            </header>
            <section className="features text-center mt-12 px-4 sm:px-6 md:px-8 lg:px-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">Features:</h2>
                <ul className="list-disc list-inside text-base sm:text-lg md:text-xl">
                    <li>View users and their albums</li>
                    <li>View and manage photos in each album</li>
                    <li>Authentication for secure access</li>
                </ul>
            </section>
        </div>
    );
};

export default LandingPage;
