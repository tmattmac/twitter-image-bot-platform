import axios from 'axios';
import { useState } from 'react';
import GridDisplayImageList from '../components/GridDisplayImageList';
import ImageEditDialog from '../components/ImageEditDialog';
import useFetch from '../hooks/useFetch';
import { getFilesFromResponse } from '../lib/transforms';

const BotManager = (props) => {
  const [images, loading, error, retry, setImages] = useFetch(
    '/api/images',
    'GET',
    getFilesFromResponse
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleUpload = (e) => {
    const newImages = [...e.target.files].map(file => {
      const formData = new FormData();
      formData.append('file', file);

      const tempFileId = String(Math.random()); // TODO: Replace with client-side UUID

      axios.post('/api/images', formData)
        .then(response => {
          const { id } = response.data;
          // update image in state once uploaded, may figure out how to batch these updates
          setImages(images => {
            return images.map(image => {
              if (image.clientId !== tempFileId) return image;
              return {
                ...image,
                id,
                isUploading: false,
              }
            });
          });
        });

      return {
        clientId: tempFileId,
        url: URL.createObjectURL(file),
        source: '',
        isUploading: true
      }
    });

    setImages(oldImages => [...newImages, ...oldImages]);
  }

  const handleClickImage = (idx) => {
    setSelectedImageIndex(idx);
  }

  const handleCloseDialog = () => setSelectedImageIndex(null);

  const selectedImage = selectedImageIndex === null ? null : images[selectedImageIndex];

  return (
    <>
      <form>
        <input type="file" onChange={handleUpload} value={undefined} multiple />
      </form>
      <GridDisplayImageList images={images || []} handleClickImage={handleClickImage} />
      <ImageEditDialog open={!!selectedImage} handleClose={handleCloseDialog} image={selectedImage} />
    </>
  )
}

export default BotManager;