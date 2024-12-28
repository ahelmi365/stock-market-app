import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSearchText } from "@store/searchTickers/searchTickersSlice";
import { useCallback, useState } from "react";

const useSearchTickers = () => {
  const searchTextFromStore = useAppSelector(state=>state.searchTickers.searchText)
  const [query, setQuery] = useState(searchTextFromStore||"");
  const dispatch = useAppDispatch();

  // Custom debounce function
  function debounce<T extends (...args: string[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return function (...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

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
