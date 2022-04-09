import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useLazyQuery(url, withCredentials) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
  
    const handleError = (error) => {
      setError(error)
      setLoading(false)
    }
  

    const runQuery = async (body) => {
        setLoading(true)
        if (body) {
          if (withCredentials) {
            var temp = await axios.post(url, {...body}, { withCredentials: true }).catch(handleError);
          } else {
            var temp = await axios.post(url, {...body}).catch(handleError);
          }
          
        } else {
          if (withCredentials) {
            var temp = await axios.get(url, {}, { withCredentials: true }).catch(handleError);
          } else {
            var temp = await axios.get(url, {}).catch(handleError);
          }
        }
        
        if (temp) {
            setError(null);
        }
        setData(temp);
        setLoading(false);
    }
  
    return { data, loading, error, fetchQuery: runQuery }
  }