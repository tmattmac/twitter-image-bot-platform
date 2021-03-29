import { CircularProgress, Fade, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  progress: {
    position: 'relative',
    color: 'white',
  },
}));

// note, only use in positioned elements
const LoadingOverlay = ({ isLoading }) => {
  const classes = useStyles();
  return (
    <Fade in={isLoading}>
      <div className={classes.root}>
        <CircularProgress className={classes.progress} />
      </div>
    </Fade>
  );
};

export default LoadingOverlay;
