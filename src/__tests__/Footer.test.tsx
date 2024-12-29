import { Footer } from "@components/common";
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "node:test";
import { expect, test } from "vitest";

afterEach(cleanup);

test("Footer contains this year", () => {
  const thisYear = new Date().getFullYear();
  const screen = render(<Footer />);
  const footerElm = screen.getByTestId("footer");
  expect(footerElm.innerText).toContain(thisYear.toString());
  expect(footerElm.innerText).toContain("All rights reserved");
});
