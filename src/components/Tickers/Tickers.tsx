import { sliceLongText } from "utils";
import useTickers from "./useTickers";

import Card from "@components/common/Card/Card";
import Loading from "@components/common/Loading/Loading";

const Tickers = () => {
  const { tickers, error, isFetchingNextPage, status } = useTickers();
  if (status === "pending") return <Loading/>;
  if (status === "error") throw error;

  const renderedTickers = tickers.map((ticker) => (
    <div className="col-sm-12 col-md-6 col-lg-4" key={ticker.ticker}>
      <Card title={ticker.ticker} text={sliceLongText(ticker?.name!)}>
        {/* <p className="nore-info">
          {ticker.currency_symbol} {ticker.base_currency_symbol}
        </p> */}
      </Card>
    </div>
  ));

  return (
    <div className="row g-3">
      <h5>All Tickers</h5>
      {renderedTickers}
      {isFetchingNextPage && <Loading/>}
    </div>
  );
};

export default Tickers;
