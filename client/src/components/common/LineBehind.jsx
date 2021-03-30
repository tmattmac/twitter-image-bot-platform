import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      borderTop: '2px solid #aaa',
      zIndex: -1,
    },
  },
  header: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
  },
}));

const LineBehind = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>{children}</div>
    </div>
  );
};

export default LineBehind;
