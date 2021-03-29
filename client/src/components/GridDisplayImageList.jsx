import { Grid, makeStyles } from '@material-ui/core';
import GridDisplayImageItem from './GridDisplayImageItem';

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: 'cover',
  },
}));

const GridDisplayImageList = ({ images, handleClickImage }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {images.map((image, idx) => (
        <GridDisplayImageItem
          image={image}
          key={image.clientId || image.id}
          handleClick={() => handleClickImage(idx)}
        />
      ))}
    </Grid>
  );
};

export default GridDisplayImageList;
