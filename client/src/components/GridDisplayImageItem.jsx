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

const GridDisplayImageItem = ({ image, ...props }) => {

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <LazyLoad height={200} once>
        <LoadingOverlay isLoading={image.isUploading}>
          <Card className={classes.card} elevation={isLoading ? 0 : 1}>
            <CardActionArea>
              <Fade in={!isLoading}>
                <CardMedia
                  image={image.url}
                  title={image.id}
                  className={classes.image}
                  component="img"
                  onLoad={() => setIsLoading(false)}
                />
              </Fade>
            </CardActionArea>
          </Card>
        </LoadingOverlay>
      </LazyLoad>
    </Grid>
  )

}

export default GridDisplayImageItem;