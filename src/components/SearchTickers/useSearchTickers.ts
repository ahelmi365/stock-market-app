import { useAppDispatch } from "@store/hooks";
import { setSearchText } from "@store/searchTickers/searchTickersSlice";
import { useCallback, useState } from "react";

const useSearchTickers = () => {
  const [query, setQuery] = useState("");
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
      // console.log("You are searching about", searchTerm);
      dispatch(setSearchText(searchTerm));
    }, 700),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return { query, handleInputChange };
};

export default useSearchTickers;
