import Card from "@components/common/Card/Card";
import { ITicker } from "@customTypes/ticker";
import { sliceLongText } from "utils";
interface IGridListProps {
  tickers: ITicker[];
}
const GridList = ({ tickers }: IGridListProps) => {
  const renderedTickers = tickers.map((ticker) => (
    <div className="col-sm-12 col-md-6 col-lg-4" key={ticker.ticker}>
      <Card title={ticker.ticker} text={sliceLongText(ticker?.name!)}></Card>
    </div>
  ));
  return <>{renderedTickers}</>;
};

export default GridList;
