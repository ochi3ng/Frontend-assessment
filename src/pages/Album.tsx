import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchPhotos = async (albumId) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    return data;
};
const Album = ({ album }) => {
    const { data: photos, isLoading: photosLoading, error: photosError } = useQuery(
        ['photos', album.id],
        () => fetchPhotos(album.id)
    );

    if (photosLoading) return <div>Loading photos for {album.title}...</div>;
    if (photosError) return <div>Error loading photos for {album.title}</div>;

    return (
        <div>
            <h2>{album.title}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {photos.map((photo) => (
                    <div key={photo.id} style={{ margin: '10px' }}>
                        <img src={photo.thumbnailUrl} alt={photo.title} style={{ width: '150px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Album