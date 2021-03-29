import { CircularProgress, Fade, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  transparent: {
    background: 'rgba(0,0,0,0.7)',
  },
  progress: {
    position: 'relative',
    color: 'white',
  },
}));

// note, only use in positioned elements
const LoadingOverlay = ({ isLoading, transparent }) => {
  const classes = useStyles();
  return (
    <Fade in={isLoading}>
      <div
        className={clsx(classes.root, { [classes.transparent]: transparent })}>
        <CircularProgress className={classes.progress} />
      </div>
    </Fade>
  );
};

export default LoadingOverlay;
