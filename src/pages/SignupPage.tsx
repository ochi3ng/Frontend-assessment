import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const SignupPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const signUpWithGoogle = async () => {
        setAuthing(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/user');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    };

    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    };

    return (
        <div className='w-full h-screen flex flex-col lg:flex-row'>
            {/* Landing Page */}
            <div className='w-full lg:w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center p-6'>
                <LandingPage />
            </div>

            {/* Signup Form */}
            <div className='w-full lg:w-1/2 h-full bg-[#1a1a1a] flex flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:p-20'>
                <div className='w-full flex flex-col max-w-[450px] mx-auto'>
                    <div className='flex flex-col mb-8 text-white text-center'>
                        <h3 className='text-3xl sm:text-4xl font-bold mb-2'>Sign Up</h3>
                        <p className='text-base sm:text-lg mb-4'>Welcome! Please enter your information below to begin.</p>
                    </div>

                    {/* Input Fields */}
                    <div className='flex flex-col mb-6 space-y-4'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Re-Enter Password'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className='text-red-500 mb-4'>{error}</div>}

                    {/* Signup Button */}
                    <button
                        onClick={signUpWithEmail}
                        disabled={authing}
                        className='w-full bg-transparent border border-white text-white font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition duration-200'>
                        Sign Up With Email and Password
                    </button>

                    {/* Divider */}
                    <div className='w-full flex items-center justify-center relative py-4'>
                        <div className='w-full h-[1px] bg-gray-500'></div>
                        <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
                    </div>

                    {/* Google Sign Up Button */}
                    <button
                        onClick={signUpWithGoogle}
                        disabled={authing}
                        className='w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7 hover:bg-gray-200 transition duration-200'>
                        Sign Up With Google
                    </button>

                    {/* Already have an account */}
                    <div className='w-full flex items-center justify-center mt-10'>
                        <p className='text-sm font-normal text-gray-400'>
                            Already have an account?
                            <span className='font-semibold text-white cursor-pointer underline'>
                                <a href='/login'> Log In</a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
