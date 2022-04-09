import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useQuery(url, withCredentials) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
  
    const handleError = (error) => {
      setError(error)
      setLoading(false)
    }
  
    const runQuery = useCallback(() => {
      const handleSuccess = (res) => {
        setData(res.data)
        setLoading(false)
      }
      setLoading(true)
      if (withCredentials) {
        axios.get(url, { withCredentials: true }).then(handleSuccess).catch(handleError)
      } else {
        axios.get(url).then(handleSuccess).catch(handleError)
      }
    }, [url])
  
    useEffect(() => {
      runQuery()
    }, [runQuery])
  
    return { data, loading, error, refetch: runQuery }
  }