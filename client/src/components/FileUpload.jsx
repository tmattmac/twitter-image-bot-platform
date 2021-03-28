import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { useCallback, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import SnackbarContext from '../context/snackbar/context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    lineHeight: 1.25
  },
  dragging: {
    backgroundColor: '#F1F2FA'
  }
}));

const FileUpload = ({ onChange }) => {
  const classes = useStyles();
  const notify = useContext(SnackbarContext);

  const onDrop = useCallback((acceptedFiles) => {
    onChange({ target: { files: acceptedFiles } });
  }, []);

  const onDropRejected = useCallback(() => {
    notify('Some files were not uploaded. Make sure all your files are image files.')
  }, [notify])

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({ onDrop, onDropRejected, accept: 'image/*' });

  return (
    <Paper
      {...getRootProps({
        elevation: 2,
        className: clsx(classes.root, {
          [classes.dragging]: isDragActive
        })
      })}>
        <input {...getInputProps()} multiple />
      <Typography variant="h6" className={classes.label}>Drag and drop or click to upload</Typography>
      <Button color="primary" variant="contained">Upload Files</Button>
    </Paper>
  )
}

export default FileUpload;