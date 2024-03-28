import { useState} from 'react';

const useRequest = (url:string, method:string = 'GET') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (options:{} = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method,
        ...options
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      console.log(result)
    } catch (error: any) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };
//   fetchData();
// console.log(url)
//   useEffect(() => {
//     fetchData();
//   }, [url,method]);

  return { data, isLoading, error, fetchData };
};

export default useRequest;
