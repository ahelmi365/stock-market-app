import { cleanup, renderHook, waitFor, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import {
  expect,
  test,
  describe,
  afterEach,
  beforeEach,
  vi,
  vitest,
} from "vitest";
import Tickers from "./../components/Tickers/Tickers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createfetchMock from "vitest-fetch-mock";
import useTickers from "@components/Tickers/useTickers";
import getTickers from "api/getTickers";
import * as hooks from "@store/hooks";
import { useAppSelector } from "@store/hooks";

const mockStore = configureMockStore();
const store = mockStore({
  tickers: {
    responses: [],
  },
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
});

afterEach(cleanup);

const fetchMocker = createfetchMock(vi);
fetchMocker.enableMocks();
const mockDispatch = vitest.fn();
vitest.mock("src/api/getTickers", () => ({
  default: vitest.fn(), // Mock the default export function
  useAppDispatch: () => mockDispatch,
  useAppSelector: vitest.fn(),
}));

const tickersMock = {
  tickers: {
    ticker: "X:00USD",
    name: "00 Token - United States dollar",
    market: "crypto",
    locale: "global",
    active: true,
    currency_symbol: "USD",
    currency_name: "United States dollar",
    base_currency_symbol: "00",
    base_currency_name: "00 Token",
    last_updated_utc: "2017-01-01T00:00:00Z",
  },
  error: null,
  isFetchingNextPage: false,
  status: " tickers, error, isFetchingNextPage, status",
};
const queryClient = new QueryClient();
describe("SearchTickers", () => {
  test("to call the api and get Pizza of the day", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter>
            <Tickers />
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>
    );
    const mockedDispatch = vitest.fn();

    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(mockedDispatch);
    fetchMocker.mockResponseOnce(JSON.stringify(tickersMock));

    const { result } = renderHook(() => useTickers());
    await waitFor(
      () => {
        expect(result.current).toEqual(tickersMock);
      },
      { timeout: 4000 }
    );
    console.log("result.current is: ", result.current);
  });
});
