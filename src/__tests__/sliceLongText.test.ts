import { sliceLongText } from "utils";
import { expect, describe, test } from "vitest";

describe("sliceLongText", () => {
  test("returns the original text if it is 40 characters or less", () => {
    const text = "Short text";
    const result = sliceLongText(text);
    expect(result).toBe(text);
  });

  test("slices the text to 40 characters if it is longer", () => {
    const text =
      "This is a very long text that should be sliced after 40 characters";
    const result = sliceLongText(text);
    expect(result).toBe("This is a very long text that should be ...");
  });
});
