import { useQuery } from 'react-query';

const useFetch = (url: string) => {
  const { data, status, error, isLoading, isError } = useQuery(
    'myData', // key
    async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  );

  return { data, status, error, isLoading, isError };
};

export default useFetch;