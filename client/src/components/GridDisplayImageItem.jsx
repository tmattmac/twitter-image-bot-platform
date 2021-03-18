import { Card, CardActionArea, CardMedia, Grid, makeStyles } from "@material-ui/core";
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

  return (
    <Grid item xs={12} sm={6} md={3}>
      <LazyLoad height={200} once>
        <LoadingOverlay isLoading={image.isUploading}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                image={image.url}
                title={image.id}
                className={classes.image}
              />
            </CardActionArea>
          </Card>
        </LoadingOverlay>
      </LazyLoad>
    </Grid>
  )

}

export default GridDisplayImageItem;