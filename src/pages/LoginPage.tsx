import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../firebaseConfig';
import LandingPage from './LandingPage';
import { Tdata } from '../types';

const LoginPage = () => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<Tdata>();

    const signInWithGoogle = async () => {
        setAuthing(true);
        setSuccessMessage('');
        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider());
            const token = await response.user.getIdToken();
            localStorage.setItem('authToken', token);
            setSuccessMessage('User logged in successfully!');
            navigate('/');
        } catch (error) {
            console.log(error);
            setAuthing(false);
        }
    };

    const signInWithEmail = async (data: Tdata) => {
        setAuthing(true);
        setError('');
        setSuccessMessage('');
        const { email, password } = data;
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const token = await response.user.getIdToken();
            localStorage.setItem('authToken', token);
            setSuccessMessage('User logged in successfully!');
            navigate('/');
        } catch (error) {
            const errorResponse = error as { code: string };
            if (errorResponse.code === 'auth/user-not-found' || errorResponse.code === 'auth/wrong-password') {
                setError('Invalid login credentials. Please check your email and password.');
            } else {
                setError('Invalid login credentials. Please check your email or Password.');
            }
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
                        <h3 className='text-3xl sm:text-4xl font-bold mb-2'>Login</h3>
                        <p className='text-base sm:text-lg mb-4'>Welcome Back! Please enter your details.</p>
                    </div>
                    {successMessage && (
                        <div className='text-blue-500 mb-4'>{successMessage}</div>
                    )}

                    <form onSubmit={handleSubmit(signInWithEmail)} className='flex flex-col mb-6 space-y-4'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        />
                        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}

                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full text-white py-3 px-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200'
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        />
                        {errors.password && <span className='text-red-500'>{errors.password.message}</span>}

                        <button
                            type='submit'
                            className='w-full bg-transparent border border-white text-white font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition duration-200'
                            disabled={authing}
                        >
                            Log In With Email and Password
                        </button>
                    </form>

                    {error && <div className='text-red-500 mb-4'>{error}</div>}

                    <div className='w-full flex items-center justify-center relative py-4'>
                        <div className='w-full h-[1px] bg-gray-500'></div>
                        <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
                    </div>

                    <button
                        className='w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7 hover:bg-gray-200 transition duration-200'
                        onClick={signInWithGoogle}
                        disabled={authing}
                    >
                        Log In With Google
                    </button>
                </div>

                <div className='w-full flex items-center justify-center mt-10'>
                    <p className='text-sm font-normal text-gray-400'>
                        Don't have an account? <span className='font-semibold text-white cursor-pointer underline'><a href='/signup'>Sign Up</a></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
