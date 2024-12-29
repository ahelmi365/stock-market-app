import useScrollTickers from "@hooks/useScrollTcikers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSearchTickersResult } from "@store/searchTickers/searchTickersSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchTickers } from "utils";
import {
  MAX_NUMBER_OF_RESPONSES_PER_SEARCH_TEXT,
  MAX_NUMBER_OF_SEARCH_RESPONSES,
  QUERY_STALE_TIME,
} from "utils/consts";

const apiKey = import.meta.env.VITE_API_KEY;
const MaxLimit = 10;

const useTickersSearchResults = () => {
  const dispatch = useAppDispatch();
  const searchTextFromTheStore = useAppSelector(
    (state) => state.searchTickers.searchText
  );
  const initialUrl = useMemo(
    () =>
      `https://api.polygon.io/v3/reference/tickers?search=${searchTextFromTheStore}&active=true&limit=10&apiKey=${apiKey}`,
    [searchTextFromTheStore]
  );
  const searchTickersResultsFromTheStore = useAppSelector(
    (state) => state.searchTickers.responses
  );

  const historySearch = useAppSelector(
    (state) => state.searchTickers.historySearch
  );

  const setTickersInTheStore = (response: any, pageParam: string) => {
    // cashing keywords, each one with max 5 api-requests
    // 5 * 10 = 50 tickers max
    // 50 requests, each one has 10 tickers max
    // = 50 * 10 = 500 tickers to be cashed as max
    if (
      searchTickersResultsFromTheStore.length <=
        MAX_NUMBER_OF_SEARCH_RESPONSES &&
      historySearch[searchTextFromTheStore] <
        MAX_NUMBER_OF_RESPONSES_PER_SEARCH_TEXT
    ) {
      console.log("Cashing new request .....");
      dispatch(setSearchTickersResult({ response, searchText: pageParam }));
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
    queryKey: ["searchtickers", initialUrl],
    queryFn: ({ pageParam = initialUrl }) => {
      if (!pageParam || !searchTextFromTheStore) return;
      return fetchTickers({
        pageParam,
        tickersFromTheStore: searchTickersResultsFromTheStore,
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
    searchTickersResults: data?.pages.flatMap((page) => page?.results) || [],
    error,
    isFetchingNextPage,
    status,
  };
};

export default useTickersSearchResults;
