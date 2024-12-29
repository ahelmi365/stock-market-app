import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { expect, test, describe, afterEach } from "vitest";
import SearchTickers from "@components/SearchTickers/SearchTickers";

const mockStore = configureMockStore();
const store = mockStore({
  tickers: {
    responses: [],
  },
});

afterEach(cleanup);

describe("SearchTickers", () => {
  test("renders search input with correct placeholder", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchTickers />
        </MemoryRouter>
      </Provider>
    );

    const searchInputElm = screen.getByPlaceholderText("Search");
    // expect(searchInputElm).toBeInTheDocument();
  });

  test("calls handleInputChange on input change", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchTickers />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "AAPL" } });

    expect(searchInput.value).toBe("AAPL");
  });
});