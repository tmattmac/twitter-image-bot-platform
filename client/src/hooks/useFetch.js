import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { DEFAULT_FETCH_ERROR } from '../lib/constants';

const useFetch = (url, method = 'GET', dataTransform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
    setLoading(true);

    // send response and catch error
    const response = await axios({ url, method })
      .catch(err => {
        setError(err.response?.data?.message || DEFAULT_FETCH_ERROR);
        return null;
      });
    
    // attempt to transform data from server using provided function
    if (response) {
      try {
        const transformedData =
          dataTransform ? dataTransform(response.data) : response.data;
        setData(transformedData);
      } catch (err) {
        setError(DEFAULT_FETCH_ERROR);
      }
    }

    setLoading(false);
  }, [url, method, dataTransform]);

  useEffect(() => {
    fetchData();
  }, []);

  return [data, loading, error, fetchData, setData]; // fetchData => retry request
}

export default useFetch;