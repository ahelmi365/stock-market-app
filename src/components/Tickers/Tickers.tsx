import useTickers from "./useTickers";

import Card from "@components/common/Card/Card";

const Tickers = () => {
  const { isPending, error, data } = useTickers();
  console.log(data);
  if (error) throw error;
  if (isPending) return <div>Loading...</div>;
  const renderedTickers = data?.results.map((ticker) => (
    <div className="col-sm-12 col-md-6 col-lg-4" key={ticker.ticker}>
      <Card title={ticker.ticker} text={ticker.name}>
        <p>
          {ticker.currency_symbol} {ticker.base_currency_symbol}
        </p>
      </Card>
    </div>
  ));
  return (
    <div className="row g-3">
      {renderedTickers}
    </div>
  );
};

export default Tickers;
