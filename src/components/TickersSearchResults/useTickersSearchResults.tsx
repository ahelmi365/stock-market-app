import useScrollTickers from "@hooks/useScrollTcikers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSearchTickersResult } from "@store/searchTickers/searchTickersSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchTickers } from "utils";

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
  // const initialUrl = `https://api.polygon.io/v3/reference/tickers?search=${searchTextFromTheStore}&active=true&limit=10&apiKey=${apiKey}`;
  const searchTickersResultsFromTheStore = useAppSelector(
    (state) => state.searchTickers.responses
  );

  const setTickersInTheStore = (response: any, pageParam: string) => {
    // cashing only the first 100 ticker (10 respones)
    if (searchTickersResultsFromTheStore.length < 11) {
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
    staleTime: 1000 * 60 * 5, // 5 minutes
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
