import { Chip, makeStyles, Typography } from '@material-ui/core';
import LineBehind from '../common/LineBehind';

const useStyles = makeStyles((theme) => ({
  text: {
    marginRight: theme.spacing(1),
  },
  chip: {
    fontWeight: 'bold',
    fontSize: theme.typography.body2.fontSize,
    height: 'auto',
    padding: theme.spacing(0.5, 0),
  },
}));

const GridDisplayTitle = ({ count }) => {
  const classes = useStyles();

  return (
    <LineBehind>
      <Typography variant="h5" className={classes.text}>
        Images
      </Typography>
      <Chip label={count} className={classes.chip} />
    </LineBehind>
  );
};

export default GridDisplayTitle;
