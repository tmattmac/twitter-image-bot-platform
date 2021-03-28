import { Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import EditScheduleForm from '../components/EditScheduleForm';
import FileUpload from '../components/FileUpload';
import GridDisplayImageList from '../components/GridDisplayImageList';
import ImageEditDialog from '../components/ImageEditDialog';
import useAsyncReducer from '../hooks/useAsyncReducerWithNotifications';
import { fetchData, uploadFiles } from '../state/images/imageActions';
import imageReducer, { initialState } from '../state/images/imageReducer';

const useStyles = makeStyles(theme => ({
  formContainer: {
    marginBottom: theme.spacing(2)
  }
}));

const BotManager = (props) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [state, dispatch] = useAsyncReducer(imageReducer, initialState);
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
      <Grid container className={classes.formContainer} spacing={4}>
        <Grid item xs={12} md={4}>
          <FileUpload onChange={handleUpload} />
        </Grid>
        <Grid item xs={12} md={8}>
          <EditScheduleForm />
        </Grid>
      </Grid>
      
      
      <GridDisplayImageList images={state.images} handleClickImage={handleClickImage} />
      <ImageEditDialog open={!!selectedImage} handleClose={handleCloseDialog} image={selectedImage} dispatch={dispatch} />
    </>
  )
}

export default BotManager;