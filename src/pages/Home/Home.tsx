import ErrorBoundry from "@components/ErrorBoundery/ErrorBoundery";
import Tickers from "@components/Tickers/Tickers";
import TickersSearchResults from "@components/TickersSearchResults/TickersSearchResults";
import useHome from "./useHome";

const Home = () => {
  const searchTickersInput = useHome();
  return (
    <ErrorBoundry>
      {searchTickersInput.length > 0 ? <TickersSearchResults /> : <Tickers />}
    </ErrorBoundry>
  );
};

export default Home;
