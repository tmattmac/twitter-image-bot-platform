import { useCallback, useReducer } from 'react';

function useAsyncReducer(reducer, initialState, init) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const asyncDispatch = useCallback((action) => {
    if (action instanceof 'function') {
      return action(dispatch);
    }
    dispatch(action);
  }, [dispatch]);

  return [state, asyncDispatch];
}

export default useAsyncReducer;