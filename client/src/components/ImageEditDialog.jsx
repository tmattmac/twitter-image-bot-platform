import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import useConfirmationDialog from '../hooks/useConfirmationDialog';
import {
  clearEditError,
  deleteImage,
  updateImageCaption,
} from '../state/images/imageActions';
import ConfirmationDialog from './ConfirmationDialog';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    minHeight: 100,
    maxHeight: '60vh',
    margin: '0 auto',
    alignSelf: 'center',
  },
  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  formInput: {
    flexGrow: 2,
  },
}));

const ImageEditDialog = ({
  image,
  open,
  handleClose: handleCloseDialog,
  dispatch,
}) => {
  const [displayImage, setDisplayImage] = useState(image);
  const [caption, setCaption] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const classes = useStyles();

  const { openDialog, getDialogProps } = useConfirmationDialog();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = useCallback(() => {
    if (isSaved) handleCloseDialog();
  }, [handleCloseDialog, isSaved]);

  useEffect(() => {
    if (image) {
      const { pending, error } = image.status.edit;
      const shouldSetCaption = !pending && !error;
      setDisplayImage(image);
      if (shouldSetCaption) setCaption(image.caption);
      setIsSaved(!image.status.edit.error);
      return () => {
        if (error) dispatch(clearEditError(image.id));
      };
    }
  }, [image]);

  const handleFormChange = (event) => {
    setCaption(event.target.value);
    setIsSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSaved(true);
    dispatch(updateImageCaption(image.id, caption));
  };

  const handleDelete = () => {
    openDialog({
      handleConfirm: () => {
        dispatch(deleteImage(image.id));
        handleCloseDialog();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={fullScreen ? 'paper' : 'body'}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        className: clsx({ [classes.dialogWrapper]: fullScreen }),
      }}>
      <DialogTitle>Edit Image Caption</DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        <img
          src={displayImage?.url}
          alt={displayImage?.id}
          className={classes.image}
        />
      </DialogContent>
      <DialogActions>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Caption"
            placeholder="This message will be tweeted alongside the image"
            value={caption}
            onChange={handleFormChange}
            className={classes.formInput}
            variant="outlined"
            disabled={image?.status.edit.pending}
            multiline
          />
          <Button disabled={isSaved} type="submit" color="primary">
            Save
          </Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="default" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </form>
      </DialogActions>
      <ConfirmationDialog {...getDialogProps()} />
    </Dialog>
  );
};

export default ImageEditDialog;
