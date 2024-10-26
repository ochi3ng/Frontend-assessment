import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBtZb2jsxk8ejc7qkblEFK56e1-kdgGw3Q",
    authDomain: "photo-app-29b37.firebaseapp.com",
    projectId: "photo-app-29b37",
    storageBucket: "photo-app-29b37.appspot.com",
    messagingSenderId: "366066520801",
    appId: "1:366066520801:web:e77be93c6e5f4690375da0",
    measurementId: "G-BPFT5WCM0X"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
