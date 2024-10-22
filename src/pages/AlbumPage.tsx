import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbum, fetchAlbumPhotos } from '../hooks/request';
import { Album as AlbumType, Photo } from '../types';

const AlbumPage: React.FC = () => {
    const { albumId } = useParams<{ albumId: string }>();
    const navigate = useNavigate();

    const { data: album, isLoading: loadingAlbum, error: albumError } = useQuery<AlbumType, Error>({
        queryKey: ['album', albumId],
        queryFn: () => fetchAlbum(Number(albumId)),
    });
    const { data: photos, isLoading: loadingPhotos, error: photosError } = useQuery<Photo[], Error>({
        queryKey: ['albumPhotos', albumId],
        queryFn: () => fetchAlbumPhotos(Number(albumId)),
    });
    if (loadingAlbum || loadingPhotos) return <div className="text-center mt-10 text-lg text-blue-500">Loading...</div>;
    if (albumError || photosError) return <div className="text-red-500 text-center mt-10 text-lg">Error loading data: {albumError?.message || photosError?.message}</div>;

    return (
        <div className="container mx-auto p-2">
            <h1 className="text-3xl font-bold text-center mb-8">{album?.title}</h1>

            <button
                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            <h2 className="text-2xl font-semibold mb-4">Photos</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos?.map((photo: Photo) => (
                    <li key={photo.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-48 object-cover rounded mb-2" />
                        <p className="text-xl font-semibold text-gray-800">{photo.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumPage;
