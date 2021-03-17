import useFetch from '../hooks/useFetch';
import { getFilesFromResponse } from '../lib/transforms';

const BotManager = (props) => {
    const [images, loading, error, retry, setImages] = useFetch(
        '/api/images',
        'GET',
        getFilesFromResponse
    );
    
    const handleUpload = (e) => {
        const formData = new FormData();

        formData.append('file', e.target.files[0]);
        axios.post('/api/images', formData).then(() => setSuccessMsg('file uploaded'));
    }

    return (
        <>
            <form>
                <input type="file" onChange={handleUpload} value={null} />
            </form>
            {images && (
                images.map(image => {
                    return <img src={image.url} alt={image.id} key={image.id} />;
                })
            )}
            <p>{successMsg}</p>
        </>
    )
}

export default BotManager;