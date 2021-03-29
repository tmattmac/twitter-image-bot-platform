import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';

const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  text = 'Are you sure?',
  open,
  ...props
}) => {
  return (
    <Dialog {...props} open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogContent>
        <Typography variant="h6">{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
