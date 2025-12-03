import { solve } from "../src/day3";
import { readInput } from "./utils";

describe("day 3", () => {
  test("example part 1", () => {
    const input = `987654321111111
        811111111111119
        234234234234278
        818181911112111`;

    expect(solve(input, 2)).toBe(357);
  });

  test("input part 1", () => {
    const input = readInput("day3");
    expect(solve(input, 2)).toBe(17229);
  });

  test("input part 2", () => {
    const input = readInput("day3");
    expect(solve(input, 12)).toBe(170520923035051);
  });
});
