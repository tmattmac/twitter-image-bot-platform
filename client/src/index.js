import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackbarProvider from './context/snackbar/provider';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
