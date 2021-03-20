import { useEffect, useState } from 'react';
import GridDisplayImageList from '../components/GridDisplayImageList';
import ImageEditDialog from '../components/ImageEditDialog';
import useAsyncReducer from '../hooks/useAsyncReducer';
import { fetchData, uploadFiles } from '../state/images/imageActions';
import imageReducer, { initialState } from '../state/images/imageReducer';

const BotManager = (props) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [state, dispatch] = useAsyncReducer(imageReducer, initialState);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleUpload = (e) => {
    dispatch(uploadFiles(e.target.files));
  }

  const handleClickImage = (idx) => {
    setSelectedImageIndex(idx);
  }

  const handleCloseDialog = () => setSelectedImageIndex(null);

  const selectedImage = selectedImageIndex === null ? null : state.images[selectedImageIndex];

  return (
    <>
      <form>
        <input type="file" onChange={handleUpload} value="" multiple />
      </form>
      <GridDisplayImageList images={state.images} handleClickImage={handleClickImage} />
      <ImageEditDialog open={!!selectedImage} handleClose={handleCloseDialog} image={selectedImage} />
    </>
  )
}

export default BotManager;