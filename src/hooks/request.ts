
import axios from 'axios';

import { User, Album } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';


export const fetchUserById = async (userId: string) => {
    const { data } = await axios.get(`${BASE_URL}/users/${userId}`);
    return data;
};


export const fetchUser = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
};

export const fetchUserAlbums = async (userId: string) => {
    const response = await axios.get(`${BASE_URL}/albums?userId=${userId}`);
    return response.data;
};

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
};
export const fetchAlbum = async (albumId: number) => {
    const response = await fetch(`${BASE_URL}/albums/${albumId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const fetchAlbumPhotos = async (albumId: number) => {
    const response = await fetch(`${BASE_URL}/albums/${albumId}/photos`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const fetchPhoto = async (photoId: string) => {
    const response = await axios.get(`${BASE_URL}/photos/${photoId}`);
    return response.data;
};

export const updatePhotoTitle = async (photoId: string, title: string) => {
    const response = await axios.patch(`${BASE_URL}/photos/${photoId}`, { title });
    return response.data;
};
export const fetchPhotos = async (albumId) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    return data;
};

export const fetchAlbums = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
    console.log(response.data); // Check what albums are returned
    return response.data;
};
