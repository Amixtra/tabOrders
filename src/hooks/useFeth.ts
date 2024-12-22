import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchData();
  }, [url]);

  return [data, error] as const;
};

export default useFetch;
