import useScrollTickers from "@hooks/useScrollTcikers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setTickers } from "@store/tickers/tickersSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import getTickers from "api/getTickers";
import { useEffect } from "react";
import { storeHasTicker } from "utils";

const apiKey = import.meta.env.VITE_API_KEY;
const MaxLimit = 10;
const initialUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${MaxLimit}&apiKey=${apiKey}`;

const useTickers = () => {
  const dispatch = useAppDispatch();
  const tickersFromTheStore = useAppSelector(
    (state) => state.tickers.responses
  );

  const fetchTickers = async ({ pageParam = initialUrl }) => {
    // check if there is a response in the store with this url or not
    if (storeHasTicker(pageParam, tickersFromTheStore)) {
      console.log("Store already has this ticker");
      const targetResponse = tickersFromTheStore.filter(
        (response) => response[pageParam] != undefined
      );
      return targetResponse[0][pageParam];
    } else {
      // call api to get new response
      console.log("get new ticker and add it to the store");
      const response = await getTickers(pageParam);
      // cashing only the first 100 ticker (10 respones)
      if (tickersFromTheStore.length < 11) {
        dispatch(setTickers({ response, requestUrl: pageParam }));
      }
      return response;
    }
  };

  const loadMoreTickers = () => {
    if (hasNextPage && !isFetchingNextPage) {
      // console.log("Fetching next page");
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
      lastPage?.next_url
        ? lastPage?.next_url + `&limit=${MaxLimit}&apiKey=${apiKey}`
        : undefined,
  });
  
  useScrollTickers(hasNextPage, isFetchingNextPage, fetchNextPage);

  return {
    // tickers: tickersFromTheStore || [],
    tickers: data?.pages.flatMap((page) => page.results) || [],
    // results: data?.pages.map((page) => page.results).flat() || [], // the same as using flatMap()
    error,
    isFetchingNextPage,
    status,
  };
};

export default useTickers;
