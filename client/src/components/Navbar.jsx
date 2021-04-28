import {
  AppBar,
  Avatar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import TwitterSignInButton from '../misc/signin.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
  },
  header: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  signInButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const Navbar = ({ user, handleLogout }) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" component="h1" className={classes.header}>
          Twitter Bot Maker
        </Typography>
        {user ? (
          <Button
            onClick={handleLogout}
            color="primary"
            disableElevation
            variant="contained"
            className={classes.button}>
            <Avatar className={classes.avatar} src={user.avatar}>
              {user.display_name[0].toUpperCase()}
            </Avatar>
            {user.display_name} (Log out)
          </Button>
        ) : (
          <a href="/auth" className={classes.signInButtonWrapper}>
            <img src={TwitterSignInButton} alt="Sign in with Twitter" />
          </a>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
