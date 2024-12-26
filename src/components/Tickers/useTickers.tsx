import { useInfiniteQuery } from "@tanstack/react-query";
import getTickers from "api/getTickers";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const MaxLimit = 10;
const initialUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${MaxLimit}&apiKey=${apiKey}`;

const useTickers = () => {
  const fetchTickers = async ({ pageParam = initialUrl }) => {
    const response = await getTickers(pageParam);
    return response;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialPageParam: initialUrl,
    queryKey: ["tickers", initialUrl],
    queryFn: fetchTickers,
    getNextPageParam: (lastPage) =>
      lastPage.next_url + `&limit=${MaxLimit}&apiKey=${apiKey}` || undefined,
  });

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll event triggered");
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        console.log("Bottom of the page reached");
        if (hasNextPage && !isFetchingNextPage) {
          console.log("Fetching next page");
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    data,
    error,
    isFetchingNextPage,
    status,
  };
};

export default useTickers;
