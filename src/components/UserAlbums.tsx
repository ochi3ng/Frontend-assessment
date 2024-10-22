// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { fetchAlbums } from '../hooks/request';
// import { Album } from '../types';

// const UserAlbumPage: React.FC = () => {
//     const { userId } = useParams<{ userId: string }>();
//     const navigate = useNavigate();

//     const { data: albums, isLoading, error } = useQuery<Album[], Error>({
//         queryKey: ['albums', userId],
//         queryFn: () => fetchAlbums(Number(userId)),
//     });

//     if (isLoading) return <div className="text-center mt-10 text-lg text-blue-500">Loading albums...</div>;
//     if (error) return <div className="text-red-500 text-center mt-10 text-lg">Error loading albums: {error.message}</div>;

//     return (
//         <div className="container mx-auto p-2">
//             <h1 className="text-3xl font-bold text-center mb-8">Albums of User {userId}</h1>

           
//             <button
//                 className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
//                 onClick={() => navigate('/user')}
//             >
//                 Back to User Page
//             </button>

//             <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {albums?.map((album: Album) => (
//                     <li key={album.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
//                         <p className="text-xl font-semibold text-gray-800">{album.title}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserAlbumPage;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbums } from '../hooks/request';
import { Album } from '../types';

const UserAlbumPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const { data: albums, isLoading, error } = useQuery<Album[], Error>({
        queryKey: ['albums', userId],
        queryFn: () => fetchAlbums(Number(userId)),
    });

    if (isLoading) return <div className="text-center mt-10 text-lg text-blue-500">Loading albums...</div>;
    if (error) return <div className="text-red-500 text-center mt-10 text-lg">Error loading albums: {error.message}</div>;

    return (
        <div className="container mx-auto p-2">
            <h1 className="text-3xl font-bold text-center mb-8">Albums of User {userId}</h1>

            <button
                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => navigate('/user')}
            >
                Back to User Page
            </button>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {albums?.map((album: Album) => (
                    <li key={album.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <p className="text-xl font-semibold text-gray-800">{album.title}</p>

                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
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
