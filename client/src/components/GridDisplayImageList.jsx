import { Grid } from '@material-ui/core';
import GridDisplayImageItem from './GridDisplayImageItem';

const GridDisplayImageList = ({ images, handleClickImage }) => {
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
