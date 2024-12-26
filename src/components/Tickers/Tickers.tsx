import useTickers from "./useTickers";

import Card from "@components/common/Card/Card";

const Tickers = () => {
  const { data, error, isFetchingNextPage, status } = useTickers();
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") throw error;

  const renderedTickers = data?.pages.flatMap((page) =>
    page.results.map((ticker) => (
      <div className="col-sm-12 col-md-6 col-lg-4" key={ticker.ticker}>
        <Card title={ticker.ticker} text={ticker.name}>
          <p>
            {ticker.currency_symbol} {ticker.base_currency_symbol}
          </p>
        </Card>
      </div>
    ))
  );
  return (
    <div className="row g-3">
      {renderedTickers}
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};

export default Tickers;
