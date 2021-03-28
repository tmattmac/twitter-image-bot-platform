import { useState } from 'react';

const useConfirmationDialog = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [callback, setCallback] = useState();

  const onConfirm = () => {
    setOpen(false);
    callback();
    setCallback(null);
  }

  const onCancel = () => {
    setOpen(false);
    setCallback(null);
  }

  const openDialog = ({ text = 'Are you sure?', handleConfirm }) => {
    setText(text);
    setCallback(() => handleConfirm);
    setOpen(true);
  }

  const getDialogProps = () => {
    return {
      open,
      text,
      onConfirm,
      onCancel
    }
  }
  
  return { openDialog, getDialogProps }
}

export default useConfirmationDialog;