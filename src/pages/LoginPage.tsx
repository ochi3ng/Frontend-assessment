import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../firebaseConfig';
import LandingPage from './LandingPage';

const LoginPage = () => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const signInWithGoogle = async () => {
        setAuthing(true);
        setSuccessMessage('');
        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider());
            const token = await response.user.getIdToken();
            localStorage.setItem('authToken', token);
            setSuccessMessage('User logged in successfully!');
            navigate('/user');
        } catch (error) {
            console.log(error);
            setAuthing(false);
        }
    };

    const signInWithEmail = async (data) => {
        setAuthing(true);
        setError('');
        setSuccessMessage('');
        const { email, password } = data;
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const token = await response.user.getIdToken();
            localStorage.setItem('authToken', token);
            setSuccessMessage('User logged in successfully!');
            navigate('/user');
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
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

            <div className="md:w-1/2 h-full bg-[#1a1a1a] flex flex-col p-6 md:p-10 lg:p-20 justify-center order-1 md:order-2">
                <div className="w-full flex flex-col max-w-[450px] mx-auto">
                    <div className="w-full flex flex-col mb-8 text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">Login</h3>
                        <p className="text-md md:text-lg mb-4">Welcome Back! Please enter your details.</p>
                    </div>
                    {successMessage && (
                        <div className="text-blue-500 mb-4">{successMessage}</div>
                    )}

                    <form onSubmit={handleSubmit(signInWithEmail)} className="w-full flex flex-col mb-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200"
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                        <button
                            type="submit"
                            className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-gray-600 transition duration-200"
                            disabled={authing}
                        >
                            Log In With Email and Password
                        </button>
                    </form>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <div className="w-full flex items-center justify-center relative py-4">
                        <div className="w-full h-[1px] bg-gray-500"></div>
                        <p className="text-md md:text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">OR</p>
                    </div>

                    <button
                        className="w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7 hover:bg-gray-200 transition duration-200"
                        onClick={signInWithGoogle}
                        disabled={authing}
                    >
                        Log In With Google
                    </button>
                </div>

                <div className="w-full flex items-center justify-center mt-10">
                    <p className="text-sm font-normal text-gray-400">
                        Don't have an account? <span className="font-semibold text-white cursor-pointer underline"><a href="/signup">Sign Up</a></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
