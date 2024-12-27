import { useCallback, useState } from "react";

const useSearchTickers = () => {
  const [query, setQuery] = useState("");

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
      // Perform the search operation, e.g., API call
      console.log("You are searching about", searchTerm);
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
