import { useCallback, useContext, useReducer } from 'react';
import SnackContext from '../context/snackbar/context';

function useAsyncReducerWithNotifications(reducer, initialState, init) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const notify = useContext(SnackContext);

  const asyncDispatch = useCallback(
    (action) => {
      if (typeof action === 'function') {
        return action(asyncDispatch);
      }
      dispatch(action);
      if (action.success) {
        notify(action.success, 'success');
      }
      if (action.error) {
        notify(action.error, 'error');
      }
    },
    [dispatch, notify]
  );

  return [state, asyncDispatch];
}

export default useAsyncReducerWithNotifications;
