import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Album } from '../types';
import { fetchUsers } from '../hooks/request';
import { useNavigate } from 'react-router-dom';

const UsersPage: React.FC = () => {
    const navigate = useNavigate();

    const { data: users, isLoading: loadingUsers, error: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    if (loadingUsers) {
        return <div className="text-center mt-10 text-lg text-blue-500">Loading...</div>;
    }
    if (usersError) {
        return <div className="text-red-500 text-center mt-10 text-lg">Error loading users</div>;
    }

    const albumCountByUserId: Record<number, number> = {};
    const albums: Album[] = [];

    albums.forEach((album) => {
        albumCountByUserId[album.userId] = (albumCountByUserId[album.userId] || 0) + 1;
    });

    return (
        <div className="container mx-auto p-2">
            <h1 className="text-3xl font-bold text-center mb-8">Users List</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users?.map((user) => (
                    <li
                        key={user.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                        <p className="text-xl font-semibold text-gray-800">
                            {user.name}
                            <span className="text-gray-500 ml-2">({albumCountByUserId[user.id] || 0} albums)</span>
                        </p>
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
