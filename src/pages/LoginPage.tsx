import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import LandingPage from './LandingPage';

const LoginPage = () => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);
        setSuccessMessage('');
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                setSuccessMessage('User logged in successfully!');
                navigate('/user');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    };

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');
        setSuccessMessage('');
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                setSuccessMessage('User logged in successfully!');
                navigate('/user');
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    setError('Invalid login credentials. Please check your email and password.');
                } else {
                    setError('Invalid login credentials. Please check your email or Password.');
                }
                setAuthing(false);
            });
    };

    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            <div className="md:w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center order-2 md:order-1">
                <LandingPage />
            </div>

            <div className="md:w-1/2 h-full bg-[#1a1a1a] flex flex-col p-6 md:p-10 lg:p-20 justify-center order-1 md:order-2">
                <div className="w-full flex flex-col max-w-[450px] mx-auto">
                    <div className="w-full flex flex-col mb-8 text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">Login</h3>
                        <p className="text-md md:text-lg mb-4">Welcome Back! Please enter your details.</p>
                    </div>
                    {successMessage && (
                        <div className="text-green-500 mb-4">{successMessage}</div>
                    )}

                    <div className="w-full flex flex-col mb-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white transition duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-gray-600 transition duration-200"
                        onClick={signInWithEmail}
                        disabled={authing}
                    >
                        Log In With Email and Password
                    </button>
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
