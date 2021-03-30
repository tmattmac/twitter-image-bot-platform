import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0, 1),
  },
}));

const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  text = 'Are you sure?',
  open,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Dialog {...props} open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogContent>
        <Typography variant="h6">{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          className={classes.button}>
          Confirm
        </Button>
        <Button onClick={onCancel} color="secondary" className={classes.button}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
