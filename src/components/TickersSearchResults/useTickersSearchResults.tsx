import useScrollTickers from "@hooks/useScrollTcikers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSearchTickersResult } from "@store/searchTickers/searchTickersSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import getTickers from "api/getTickers";
import { useEffect, useMemo } from "react";
import { storeHasTicker } from "utils";

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

  const fetchTickers = async ({ pageParam = initialUrl }) => {
    if (!pageParam || !searchTextFromTheStore) return;
    // check if there is a response in the store with this url or not
    if (storeHasTicker(pageParam, searchTickersResultsFromTheStore)) {
      console.log("Store already has this ticker");
      const targetResponse = searchTickersResultsFromTheStore.filter(
        (response) => response[pageParam] != undefined
      );
      return targetResponse[0][pageParam];
    } else {
      // call api to get new response
      console.log("get new ticker and add it to the store");
      const response = await getTickers(pageParam);
      // cashing only the first 100 ticker (10 respones)
      if (searchTickersResultsFromTheStore.length < 11) {
        dispatch(setSearchTickersResult({ response, searchText: pageParam }));
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
    queryKey: ["searchtickers", initialUrl],
    queryFn: fetchTickers,
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
