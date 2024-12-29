import { Header } from "@components/common";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { expect, test } from "vitest";

// setupTests.ts
// import '@testing-library/jest-dom';
const mockStore = configureMockStore();
const store = mockStore({
  tickers: {
    responses: [],
  },
});

test("just a test", () => {
  const screen = render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  const homeLink = screen.getByRole("link", { name: /home/i });
  expect(homeLink.innerText).toContain("Home");
  expect(homeLink.hasAttribute("href"));
  expect(homeLink.getAttribute("href")).toBe("/stock-market-app");
});
