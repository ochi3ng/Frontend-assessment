import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbum, fetchAlbumPhotos } from '../hooks/request';
import { TAlbum as AlbumType, Photo } from '../types';
import LoadingPage from './LoadingPage';

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

    if (loadingAlbum || loadingPhotos)
        return <div><LoadingPage/></div>;

    if (albumError || photosError)
        return <div className="text-red-500 text-center mt-10 text-lg">Error loading data: {albumError?.message || photosError?.message}</div>;

    return (
        <div
            className="container mx-auto p-2"
            style={{
                backgroundImage: 'url(https://media.istockphoto.com/id/1658039887/photo/beautiful-background-of-navy-paper.jpg?s=1024x1024&w=is&k=20&c=v370oBDueKP9QNkP3DwBc4YmBTgXQo8G7w0-W3hfcv8=)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <h1 className="text-3xl text-white font-bold text-center mb-8">Photos of  {album?.title}</h1>

            <button
                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900"
                onClick={() => navigate(-1)}
            >
                Go Back To Albums
            </button>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos?.map((photo: Photo) => (
                    <li key={photo.id} className="bg-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-48 object-cover rounded mb-2" />
                        <p className="text-xl font-semibold text-black">{photo.title}</p>
                        <button
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900 transition-colors duration-200"
                            onClick={() => navigate(`/photo/${photo.id}`)}
                        >
                            View Photo
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumPage;
