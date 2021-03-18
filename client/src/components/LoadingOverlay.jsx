import { CircularProgress, Fade, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    position: 'relative',
    color: 'white'
  }
}));

// note, using this with absolutely positioned elements will break
const LoadingOverlay = ({ children, isLoading }) => {
  const classes = useStyles();
  const overlay = (
    <Fade in={isLoading} key="thanks React">
      <div className={classes.root}>
        <CircularProgress className={classes.progress} />
      </div>
    </Fade>
  );

  return React.Children.only(children) &&
    React.Children.map(children, child => {
      return React.cloneElement(child, {
        style: {
          width: 'relative',
          ...child.props.style
        }
      }, [child.props.children, overlay])
    });
}

export default LoadingOverlay;