import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Album, User } from '../types';
import { fetchUsers, fetchAlbums } from '../hooks/request';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const UsersPage: React.FC = () => {
    const navigate = useNavigate();

    const { data: users, isLoading: loadingUsers, error: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const { data: albums, isLoading: loadingAlbums, error: albumsError } = useQuery({
        queryKey: ['albums'],
        queryFn: fetchAlbums,
    });

    if (loadingUsers || loadingAlbums) {
        return <div><LoadingPage/></div>;
    }
    if (usersError) {
        return <div className="text-red-500 text-center mt-10 text-lg">Error loading users</div>;
    }
    if (albumsError) {
        return <div className="text-red-500 text-center mt-10 text-lg">Error loading albums</div>;
    }
    const albumCountByUserId: Record<number, number> = {};
    albums?.forEach((album: Album) => {
        albumCountByUserId[album.userId] = (albumCountByUserId[album.userId] || 0) + 1;
    });

    return (
        <div
            className="container mx-auto p-2"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="text-3xl text-white font-bold text-center mb-8">Users List</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users?.map((user: User) => (
                    <li
                        key={user.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                            <p className="text-xl font-bold text-gray-800 mb-2">
                                Name: <span className="font-normal">{user.name}</span>
                            </p>
                            <p className="text-xl font-bold text-gray-800 mb-2">
                                Username: <span className="font-normal">{user.username}</span>
                            </p>
                            <p className="text-xl font-bold text-gray-800 mb-2">
                                Email: <span className="font-normal">{user.email}</span>
                            </p>
                            <span className="text-gray-500 text-sm">
                                ({albumCountByUserId[user.id] || 0} albums)
                            </span>
                        </div>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={() => navigate(`/user-albums/${user.id}`)}
                        >
                            View Albums
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
