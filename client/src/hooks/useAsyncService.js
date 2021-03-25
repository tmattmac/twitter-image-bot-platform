import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_FETCH_ERROR } from '../lib/constants';

const useAsyncService = (service, method) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
    setLoading(true);

    if (typeof service[method] !== 'function') {
      throw new Error('useAsyncService requires the second argument to be a valid method name');
    }

    try {
      const response = await service[method]();
      setData(response);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || DEFAULT_FETCH_ERROR);
    }
    
    setLoading(false);
  }, [service, method]);

  useEffect(() => { 
    fetchData();
  }, [fetchData]);

  return [data, loading, error]; 
}

export default useAsyncService;