import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  text: {
    marginBottom: theme.spacing(1),
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="h4" component="h2" className={classes.heading}>
            Welcome
          </Typography>
          <Typography className={classes.text}>
            Wanna build one of those fancy image bots all the cool kids are
            making but don't have any programming experience? This tool makes
            the process dead simple. All you have to do is sign in via your
            bot's Twitter account, upload some images, and configure how
            frequently you'd like the bot to post.
          </Typography>
          <Typography>Interested? Get started by signing in above.</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
