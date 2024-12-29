import { useAppSelector } from "@store/hooks";

const useHome = () => {
  const searchTickersInput = useAppSelector(
    (state) => state.searchTickers.searchText
  );
  return searchTickersInput;
};

export default useHome;
