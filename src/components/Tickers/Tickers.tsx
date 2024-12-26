import useTickers from "./useTickers";

const Tickers = () => {
  const { isPending, error, data } = useTickers();
  console.log(data)
    if (isPending) return <div>Loading...</div>;
  if (error) throw error;
  return <div className="row"> data</div>;
};

export default Tickers;
