import { Button, Dialog, DialogContent, makeStyles, TextField } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  image: {
    maxWidth: '100%',
    maxHeight: '80vh'
  }
}));

const ImageEditDialog = ({ image, open, handleClose: handleCloseDialog }) => {
  const [caption, setCaption] = useState(image?.source || '');
  const [isSaved, setIsSaved] = useState(true);
  const classes = useStyles();

  const handleClose = useCallback(() => {
    if (isSaved) handleCloseDialog();
  }, [handleCloseDialog, isSaved]);

  useEffect(() => {
    setCaption(image?.source || '');
    setIsSaved(true);
  }, [image])

  const handleFormChange = (event) => {
    setCaption(event.target.value);
    setIsSaved(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSaved(true);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogContent>
        <img src={image?.url} alt={image?.id} className={classes.image} />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Caption"
            placeholder="This message will be tweeted alongside the image"
            value={caption}
            onChange={handleFormChange}
          />
          <Button disabled={isSaved}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ImageEditDialog;