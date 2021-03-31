import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useMemo, useState } from 'react';
import LazyLoad from 'react-lazyload';
import LoadingOverlay from './LoadingOverlay';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    height: 200,
    [theme.breakpoints.down('xs')]: {
      height: '30vh',
    },
  },
  card: {
    position: 'relative',
    animation: '$fadeIn 300ms',
    animationDelay: '150ms',
    animationFillMode: 'both',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const GridDisplayImageItem = ({ image, handleClick, ...props }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  return useMemo(() => {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <LazyLoad height={200} once>
          <Card className={classes.card}>
            <LoadingOverlay
              isLoading={
                image.status.upload.pending ||
                image.status.delete.pending ||
                isLoading
              }
              transparent={!isLoading}
            />
            <CardActionArea>
              <CardMedia
                image={image.url}
                title={image.id}
                className={classes.image}
                component="img"
                onLoad={() => setIsLoading(false)}
                onClick={() => handleClick(image.id)}
              />
            </CardActionArea>
          </Card>
        </LazyLoad>
      </Grid>
    );
  }, [image, classes, isLoading, handleClick]);
};

export default GridDisplayImageItem;
