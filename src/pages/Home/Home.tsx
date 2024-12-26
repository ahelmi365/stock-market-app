import ErrorBoundry from "@components/ErrorBoundery/ErrorBoundery";
import Tickers from "@components/Tickers/Tickers";

const Home = () => {
  return (
    <ErrorBoundry>
      <Tickers />
    </ErrorBoundry>
  );
};

export default Home;
