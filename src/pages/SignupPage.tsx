import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LandingPage from './LandingPage';

const SignupPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const signUpWithGoogle = async () => {
        setAuthing(true);
        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider());
            const token = await response.user.getIdToken();
            localStorage.setItem('authToken', token);
            navigate('/user');
        } catch (error) {
            console.log(error);
            setAuthing(false);
        }
    };

    const signUpWithEmail = async (data) => {
        const { email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const token = await response.user.getIdToken();
            localStorage.setItem('authToken', token);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setError(error.message);
            setAuthing(false);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col lg:flex-row'>
            <div className='w-full lg:w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center p-6'>
                <LandingPage />
            </div>
            <div className='w-full lg:w-1/2 h-full bg-[#1a1a1a] flex flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:p-20'>
                <div className='w-full flex flex-col max-w-[450px] mx-auto'>
                    <div className='flex flex-col mb-8 text-white text-center'>
                        <h3 className='text-3xl sm:text-4xl font-bold mb-2'>Sign Up</h3>
                        <p className='text-base sm:text-lg mb-4'>Welcome! Please enter your information below to begin.</p>
                    </div>
                    <form onSubmit={handleSubmit(signUpWithEmail)} className='flex flex-col mb-6 space-y-4'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <div className='text-red-500'>{errors.email.message}</div>}

                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        />
                        {errors.password && <div className='text-red-500'>{errors.password.message}</div>}

                        <input
                            type='password'
                            placeholder='Re-Enter Password'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            {...register('confirmPassword', { required: 'Please confirm your password' })}
                        />
                        {errors.confirmPassword && <div className='text-red-500'>{errors.confirmPassword.message}</div>}
                    </form>

                    {error && <div className='text-red-500 mb-4'>{error}</div>}

                    <button
                        type='submit'
                        disabled={authing}
                        className='w-full bg-transparent border border-white text-white font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition duration-200'
                        onClick={handleSubmit(signUpWithEmail)}
                    >
                        Sign Up With Email and Password
                    </button>

                    <div className='w-full flex items-center justify-center relative py-4'>
                        <div className='w-full h-[1px] bg-gray-500'></div>
                        <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
                    </div>
                    <button
                        onClick={signUpWithGoogle}
                        disabled={authing}
                        className='w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7 hover:bg-gray-200 transition duration-200'
                    >
                        Sign Up With Google
                    </button>
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
