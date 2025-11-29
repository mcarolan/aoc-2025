import { inc } from "../src/foo";

describe("foo", () => {
  test("inc", () => {
    expect(inc(1)).toBe(2);
  });
});
