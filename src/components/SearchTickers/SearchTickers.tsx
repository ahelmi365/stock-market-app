import useSearchTickers from "./useSearchTickers";

const SearchTickers = () => {
    const {query, handleInputChange} = useSearchTickers()
  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchTickers;
