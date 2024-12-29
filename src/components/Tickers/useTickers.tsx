import useScrollTickers from "@hooks/useScrollTcikers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setTickers } from "@store/tickers/tickersSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTickers } from "utils";
import { QUERY_STALE_TIME } from "utils/consts";

const apiKey = import.meta.env.VITE_API_KEY;
const MaxLimit = 10;
const initialUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${MaxLimit}&apiKey=${apiKey}`;

const useTickers = () => {
  const dispatch = useAppDispatch();
  const tickersFromTheStore = useAppSelector(
    (state) => state.tickers.responses
  );

  const setTickersInTheStore = (response: any, pageParam: string) => {
    // cashing only the first 100 ticker (10 respones)
    if (tickersFromTheStore.length < 11) {
      dispatch(setTickers({ response, requestUrl: pageParam }));
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
    staleTime: QUERY_STALE_TIME,
    initialPageParam: initialUrl,
    queryKey: ["tickers", initialUrl],
    // queryFn: fetchTickers,
    queryFn: ({ pageParam = initialUrl }) => {
      return fetchTickers({
        pageParam,
        tickersFromTheStore,
        setTickersInTheStore,
      });
    },
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
