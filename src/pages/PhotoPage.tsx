// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchPhoto, updatePhotoTitle } from '../hooks/request';

// interface Photo {
//     id: string;
//     title: string;
//     url: string;
// }

// const PhotoPage: React.FC = () => {
//     const { photoId } = useParams<{ photoId: string }>();
//     const navigate = useNavigate();

//     const { data: photo, isLoading, error } = useQuery({
//         queryKey: ['photo', photoId],
//         queryFn: () => fetchPhoto(photoId!),
//     });

//     const mutation = useMutation({
//         mutationFn: (title: string) => updatePhotoTitle(photoId!, title),
//         onSuccess: () => {
//         },
//     });

//     const [title, setTitle] = useState('');

//     const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.target.value);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         mutation.mutate(title);
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error loading photo</div>;

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Photo Details</h1>
//             <img src={photo.url} alt={photo.title} className="mb-4 w-full h-auto" />
//             <form onSubmit={handleSubmit} className="flex flex-col">
//                 <label className="mb-2">
//                     Title:
//                     <input
//                         type="text"
//                         value={title || photo.title}
//                         onChange={handleTitleChange}
//                         className="border rounded p-2 w-full"
//                     />
//                 </label>
//                 <button type="submit" className="bg-blue-500 text-white rounded p-2">
//                     Update Title
//                 </button>
//             </form>
//             {mutation.isLoading && <div>Updating...</div>}
//             {mutation.isError && <div>Error updating title</div>}
//             {mutation.isSuccess && <div>Title updated successfully!</div>}
//         </div>
//     );
// };

// export default PhotoPage;

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhoto, updatePhotoTitle } from '../hooks/request';

interface Photo {
    id: string;
    title: string;
    url: string;
}

const PhotoPage: React.FC = () => {
    const { photoId } = useParams<{ photoId: string }>();
    const navigate = useNavigate();

    const { data: photo, isLoading, error } = useQuery({
        queryKey: ['photo', photoId],
        queryFn: () => fetchPhoto(photoId!),
    });

    const mutation = useMutation({
        mutationFn: (title: string) => updatePhotoTitle(photoId!, title),
        onSuccess: () => {
            // Handle success
        },
    });

    const [title, setTitle] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(title);
    };

    if (isLoading) return <div className="text-center text-blue-500 text-lg">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">Error loading photo</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Photo Details</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Photo Display */}
                <div className="flex-1">
                    <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-auto rounded shadow-lg object-cover mb-4"
                    />
                </div>

                {/* Photo Title Update Form */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-lg font-medium mb-2">
                                Title:
                            </label>
                            <input
                                type="text"
                                value={title || photo.title}
                                onChange={handleTitleChange}
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Edit photo title"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-lg py-3 font-semibold transition duration-200 hover:bg-blue-600"
                        >
                            Update Title
                        </button>
                    </form>

                    {mutation.isLoading && (
                        <div className="mt-4 text-blue-500">Updating...</div>
                    )}
                    {mutation.isError && (
                        <div className="mt-4 text-red-500">Error updating title</div>
                    )}
                    {mutation.isSuccess && (
                        <div className="mt-4 text-green-500">Title updated successfully!</div>
                    )}
                </div>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="mt-8 bg-gray-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-gray-700"
            >
                Go Back
            </button>
        </div>
    );
};

export default PhotoPage;

