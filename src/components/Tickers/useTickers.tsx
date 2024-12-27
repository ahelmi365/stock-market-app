import { useInfiniteQuery } from "@tanstack/react-query";
import getTickers from "api/getTickers";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const MaxLimit = 10;
const initialUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${MaxLimit}&apiKey=${apiKey}`;

const useTickers = () => {
  const [requestUrl, setRequestUrl] = useState(initialUrl);
  const fetchTickers = async ({ pageParam = initialUrl }) => {
    const response = await getTickers(pageParam);
    return response;
  };

  const loadMoreTickers = () => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page");
      fetchNextPage();
    }
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
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20
      ) {
        console.log("Bottom of the page reached");
        loadMoreTickers();
        // setRequestUrl(data!.pages[data!.pages.length - 1].next_url);
      }
    };

    // load more tickers if content height is less than or equal to viewport height
    const checkContentHeight = () => {
      if (document.documentElement.scrollHeight <= window.innerHeight) {
        loadMoreTickers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkContentHeight();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return {
    tickers: data?.pages.flatMap((page) => page.results) || [],
    // results: data?.pages.map((page) => page.results).flat() || [], // the same as using flatMap()
    error,
    isFetchingNextPage,
    status,
  };
};

export default useTickers;
