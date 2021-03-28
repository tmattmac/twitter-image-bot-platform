import { Card, CardActionArea, CardMedia, Fade, Grid, makeStyles } from "@material-ui/core";
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import LoadingOverlay from "./LoadingOverlay";

const useStyles = makeStyles(theme => ({
  root: {

  },
  image: {
    height: 200,
    [theme.breakpoints.down('xs')]: {
      height: "30vh"
    }
  },
  card: {
    position: 'relative'
  }
}));

const GridDisplayImageItem = ({ image, handleClick, ...props }) => {

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <LazyLoad height={200} offset={100} once>
        <Fade in={!isLoading}>
          <Card className={classes.card}>
            <LoadingOverlay isLoading={image.status.upload.pending || image.status.delete.pending} />
            <CardActionArea>
              <CardMedia
                image={image.url}
                title={image.id}
                className={classes.image}
                component="img"
                onLoad={() => setIsLoading(false)}
                onClick={() => handleClick()}
              />
            </CardActionArea>
          </Card>
        </Fade>
      </LazyLoad>
    </Grid>
  )

}

export default GridDisplayImageItem;