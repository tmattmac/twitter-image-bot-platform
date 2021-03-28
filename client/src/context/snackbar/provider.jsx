import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useCallback, useEffect, useState } from 'react';
import SnackbarContext from './context';

const SnackbarProvider = ({ children }) => {

  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(null);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (queue.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...queue[0] });
      setQueue(queue => queue.slice(1));
      setOpen(true);
    } else if (queue.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [messageInfo, open, queue])

  const notify = useCallback((message, severity) => {
    setQueue(queue => [...queue, { message, severity, key: new Date().getTime() }]);
  }, []);
  
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleExited = () => {
    setMessageInfo(null);
  }

  return (
    <SnackbarContext.Provider value={notify}>
      <Snackbar
        key={messageInfo?.key}
        autoHideDuration={6000}
        open={open}
        onClose={handleClose}
        onExited={handleExited}
      >
        <Alert severity={messageInfo?.severity || 'error'} variant="filled" onClose={handleClose} elevation={2}>
          {messageInfo?.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider> 
  )
}

export default SnackbarProvider;