import useSearchTickers from "./useSearchTickers";

const SearchTickers = () => {
  const { query, handleInputChange } = useSearchTickers();
  return (
    <form
      className="d-flex"
      role="search"
      aria-labelledby="search-tickers-label"
    >
      <label
        id="search-tickers-label"
        htmlFor="search-tickers-input"
        className="visually-hidden"
      >
        Search Tickers
      </label>
      <input
        id="search-tickers-input"
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search Tickers"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchTickers;
