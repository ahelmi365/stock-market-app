import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSearchText } from "@store/searchTickers/searchTickersSlice";
import { useCallback, useState } from "react";
import { debounce } from "utils";

const useSearchTickers = () => {
  const searchTextFromStore = useAppSelector(
    (state) => state.searchTickers?.searchText
  );
  const [query, setQuery] = useState(searchTextFromStore || "");
  const dispatch = useAppDispatch();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm) {
        dispatch(setSearchText(trimmedSearchTerm));
      }
    }, 800),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const trimmedValue = value.trim();
    setQuery(value);
    if (trimmedValue) {
      debouncedSearch(trimmedValue);
    } else {
      dispatch(setSearchText(""));
    }
  };

  return { query, handleInputChange };
};

export default useSearchTickers;
