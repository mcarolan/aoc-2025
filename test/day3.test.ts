import { part1 } from "../src/day3";
import { readInput } from "./utils.test";

describe("day 3", () => {
  test("example part 1", () => {
    const input = `987654321111111
        811111111111119
        234234234234278
        818181911112111`;

    expect(part1(input)).toBe(357);
  });

  test("input part 1", () => {
    const input = readInput("day3");
    expect(part1(input)).toBe(17229);
  });
});
