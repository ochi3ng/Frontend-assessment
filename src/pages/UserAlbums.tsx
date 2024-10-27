import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbums } from '../hooks/request';
import { TAlbum } from '../types';

const UserAlbumPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { data: albums, isLoading, error } = useQuery<TAlbum[], Error>({
        queryKey: ['albums', userId],
        queryFn: () => fetchAlbums(),
    });

    if (isLoading) return <div className="text-center mt-10 text-lg text-blue-500">Loading albums...</div>;
    if (error) return <div className="text-red-500 text-center mt-10 text-lg">Error loading albums: {error.message}</div>;

    return (
        <div
            className="container mx-auto p-2"
            style={{
                backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1674929041861-27c086fdc864?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <h1 className="text-3xl font-bold text-white text-center mb-8">Albums of  {searchParams.get('user')}</h1>

            <button
                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900"
                onClick={() => navigate('/')}
            >
                Back to home Page
            </button>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {albums?.map((album: TAlbum) => (
                    <li key={album.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <p className="text-xl font-semibold text-gray-800">{album.title}</p>

                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900"
                            onClick={() => navigate(`/albums/${album.id}`)}
                        >
                            View Photos
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAlbumPage;
