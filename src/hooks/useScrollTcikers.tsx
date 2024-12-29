import { useEffect } from "react";

const useScrollTickers = (
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  fetchNextPage: () => void
) => {
  const loadMoreTickers = () => {
    if (hasNextPage && !isFetchingNextPage) {
      // console.log("Fetching next page");
      fetchNextPage();
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (
        hasNextPage &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 20
      ) {
        console.log("Bottom of the page reached");
        loadMoreTickers();
      }
    };

    // load more tickers if content height is less than or equal to viewport height
    const checkContentHeight = () => {
      if (
        hasNextPage &&
        document.documentElement.scrollHeight <= window.innerHeight
      ) {
        loadMoreTickers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkContentHeight();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
};

export default useScrollTickers;
