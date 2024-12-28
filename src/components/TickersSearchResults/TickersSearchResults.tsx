import { sliceLongText } from "utils";
import useTickersSearchResults from "./useTickersSearchResults";

import Card from "@components/common/Card/Card";
import Loading from "@components/common/Loading/Loading";

const TickersSearchResults = () => {
  const { searchTickersResults, error, isFetchingNextPage, status } =
    useTickersSearchResults();
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") throw error;

  const renderedTickers = searchTickersResults.map((ticker) => (
    <div className="col-sm-12 col-md-6 col-lg-4" key={ticker?.ticker!}>
      <Card title={ticker?.ticker!} text={sliceLongText(ticker?.name!)}>
        {/* <p className="more-info">
          {ticker?.currency_symbol! || "---"} {ticker?.base_currency_symbol! || "---"}
        </p> */}
      </Card>
    </div>
  ));

  return (
    <div className="row g-3">
      <h5>Search Results</h5>

      {searchTickersResults.length>0? renderedTickers: <p>No results found!</p>}
      {isFetchingNextPage && <Loading/>}
    </div>
  );
};

export default TickersSearchResults;
