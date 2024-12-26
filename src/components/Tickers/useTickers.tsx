import { useQuery } from "@tanstack/react-query";
const apiKey = import.meta.env.VITE_API_KEY;

import getTickers from "api/getTickers";
const useTickers = () => {
  const url = `https://api.polygon.io/v3/reference/tickers?active=true&limit=9&apiKey=${apiKey}`;

  const { isPending, error, data } = useQuery({
    queryKey: ["tickers", url],
    queryFn: () => getTickers(url),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { isPending, error, data };
};

export default useTickers;
