import useTickersSearchResults from "./useTickersSearchResults";

import Loading from "@components/common/Loading/Loading";
import GridList from "@components/GridList/GridList";

const TickersSearchResults = () => {
  const { searchTickersResults, error, isFetchingNextPage, status } =
    useTickersSearchResults();
  if (status === "pending") return <Loading />;
  if (status === "error") throw error;

  return (
    <div className="row g-3">
      <h5>Search Results</h5>

      {searchTickersResults.length > 0 ? (
        <GridList
          tickers={searchTickersResults.filter(
            (ticker) => ticker !== undefined
          )}
        />
      ) : (
        <p>No results found!</p>
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default TickersSearchResults;
