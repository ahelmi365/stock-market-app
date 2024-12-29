import useTickers from "./useTickers";

import Loading from "@components/common/Loading/Loading";
import GridList from "@components/GridList/GridList";

const Tickers = () => {
  const { tickers, error, isFetchingNextPage, status } = useTickers();
  if (status === "pending") return <Loading />;
  if (status === "error") throw error;

  return (
    <div className="row g-3">
      <h5>All Tickers</h5>
      <GridList tickers={tickers} />
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default Tickers;
