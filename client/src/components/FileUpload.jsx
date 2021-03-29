import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { useCallback, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import SnackbarContext from '../context/snackbar/context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2)
  },
  label: {
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    lineHeight: 1.25
  },
  dragging: {
    backgroundColor: '#F1F2FA'
  },
  dropArea: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(8, 1),
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px dashed rgba(0,0,0,0.25)',
    borderRadius: theme.spacing(1)
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
    <Paper elevation={2} className={classes.root}>
      <div {...getRootProps({
        className: clsx(classes.dropArea, {
          [classes.dragging]: isDragActive
        })
      })}>
      <input {...getInputProps()} multiple />
      <Typography variant="h6" className={classes.label}>Drag and drop or click to upload</Typography>
        <Button color="primary" variant="contained">Upload Files</Button>
      </div>
    </Paper>
  )
}

export default FileUpload;