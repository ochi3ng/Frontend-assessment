import axiosInstance from './api';
import { User } from '../types';

export const fetchUserById = async (userId: string) => {
    const { data } = await axiosInstance.get(`/users/${userId}`);
    return data;
};

export const fetchUser = async () => {
    const { data } = await axiosInstance.get('/users');
    return data;
};

export const fetchUserAlbums = async (userId: string) => {
    const { data } = await axiosInstance.get(`/albums?userId=${userId}`);
    return data;
};

export const fetchUsers = async (): Promise<User[]> => {
    const { data } = await axiosInstance.get('/users');
    return data;
};

export const fetchAlbum = async (albumId: number) => {
    const { data } = await axiosInstance.get(`/albums/${albumId}`);
    return data;
};

export const fetchAlbumPhotos = async (albumId: number) => {
    const { data } = await axiosInstance.get(`/albums/${albumId}/photos`);
    return data;
};

export const fetchPhoto = async (photoId: string) => {
    const { data } = await axiosInstance.get(`/photos/${photoId}`);
    return data;
};

export const updatePhotoTitle = async (photoId: string, title: string) => {
    const { data } = await axiosInstance.patch(`/photos/${photoId}`, { title });
    return data;
};

export const fetchPhotos = async (albumId: string) => {
    const { data } = await axiosInstance.get(`/photos?albumId=${albumId}`);
    return data;
};

export const fetchAlbums = async () => {
    const { data } = await axiosInstance.get('/albums');
    return data;
};
