import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserAlbums from './pages/UserAlbums';
import AlbumPage from './pages/AlbumPage';
import UsersPage from './pages/UsersPage';
import UserAlbumPage from './pages/UserAlbums';
import Navbar from './components/Navbar';
import PhotoPage from './pages/PhotoPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const App: React.FC = () => {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route element={<PublicRoute redirectPath="/" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

      
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-albums/:userId"
          element={
            <PrivateRoute>
              <UserAlbumPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <PrivateRoute>
              <UserAlbums />
            </PrivateRoute>
          }
        />
        <Route
          path="/albums/:albumId"
          element={
            <PrivateRoute>
              <AlbumPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/photo/:photoId"
          element={
            <PrivateRoute>
              <PhotoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
