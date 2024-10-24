import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhoto, updatePhotoTitle } from '../hooks/request';
import LoadingPage from './LoadingPage';
import { useForm } from 'react-hook-form';

const PhotoPage: React.FC = () => {
    const { photoId } = useParams<{ photoId: string }>();
    const navigate = useNavigate();

    const { data: photo, isLoading, error } = useQuery({
        queryKey: ['photo', photoId],
        queryFn: () => fetchPhoto(photoId!),
    });

    const mutation = useMutation({
        mutationFn: (title: string) => updatePhotoTitle(photoId!, title),
        onSuccess: () => { },
    });

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: photo?.title || '',
        },
    });

    const onSubmit = (data: { title: string }) => {
        mutation.mutate(data.title);
    };
    React.useEffect(() => {
        if (photo) {
            setValue('title', photo.title);
        }
    }, [photo, setValue]);

    if (isLoading) return <div><LoadingPage /></div>;
    if (error) return <div className="text-red-500 text-center mt-4">Error loading photo</div>;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Photo Details</h1>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                    <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-auto rounded-lg shadow-lg object-cover mb-4 transform hover:scale-105 transition duration-300"
                    />
                </div>
                <div className="flex-1">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-lg font-semibold mb-2">
                                Edit Title:
                            </label>
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="Edit photo title"
                            />
                        </div>
                        {mutation.isError && (
                            <div className="mt-4 text-red-500 text-center">Error updating title</div>
                        )}
                        {mutation.isSuccess && (
                            <div className="mt-4 text-green-500 text-center">Title updated successfully!</div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold transition duration-300 hover:bg-blue-700 hover:shadow-lg"
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? 'Updating...' : 'Update Title'}
                        </button>
                    </form>
                </div>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="mt-8 bg-gray-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-gray-700 transition duration-300 mx-auto block"
            >
                Go Back
            </button>
        </div>
    );
};

export default PhotoPage;
