import { Footer } from "@components/common";
import { render, cleanup } from "@testing-library/react";
import { expect, test, vi, describe, beforeAll } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach } from "node:test";

afterEach(cleanup);

test("Footer contains this year", () => {
  const thisYear = new Date().getFullYear();
  const screen = render(<Footer />);
  const footerElm = screen.getByTestId("footer");
  expect(footerElm.innerText).toContain(thisYear.toString());
  expect(footerElm.innerText).toContain("All rights reserved");
});
