import SearchTickers from "@components/SearchTickers/SearchTickers";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { afterEach, describe, expect, test } from "vitest";

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

    screen.getByPlaceholderText("Search");
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