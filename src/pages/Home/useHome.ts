import { useAppSelector } from "@store/hooks";

const useHome = () => {
  const searchTickersInput = useAppSelector((state) => state.searchTickers.searchText);
  // const searchTickersInput = ""
console.log({searchTickersInput})
  return searchTickersInput
};

export default useHome;
