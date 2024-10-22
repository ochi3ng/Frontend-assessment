import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserAlbums from './components/UserAlbums';
import AlbumPage from './pages/AlbumPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import UsersPage from './pages/UsersPage';
import UserAlbumPage from './components/UserAlbums';

const App: React.FC = () => {
  return (
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/user' element={<UsersPage />} />
        <Route path="/user-albums/:userId" element={<UserAlbumPage />} />
        <Route path="/user/:userId" element={<UserAlbums />} />
        <Route path="/user/:userId" element={<AlbumPage />} />
        <Route path="/albums/:albumId" element={<AlbumPage />} />
      </Routes>
  );
};

export default App;
