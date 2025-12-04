import { part1, part2 } from "../src/day4";
import { readInput } from "./utils";

describe("day 4", () => {
  describe("part 1", () => {
    test("example", () => {
      const input = `..@@.@@@@.
            @@@.@.@.@@
            @@@@@.@.@@
            @.@@@@..@.
            @@.@@@@.@@
            .@@@@@@@.@
            .@.@.@.@@@
            @.@@@.@@@@
            .@@@@@@@@.
            @.@.@@@.@.`;
      expect(part1(input)).toBe(13);
    });

    test("input", () => {
      expect(part1(readInput("day4"))).toBe(1533);
    });
  });

  describe("part 2", () => {
    test("example", () => {
      const input = `..@@.@@@@.
            @@@.@.@.@@
            @@@@@.@.@@
            @.@@@@..@.
            @@.@@@@.@@
            .@@@@@@@.@
            .@.@.@.@@@
            @.@@@.@@@@
            .@@@@@@@@.
            @.@.@@@.@.`;
      expect(part2(input)).toBe(43);
    });

    test("input", () => {
      expect(part2(readInput("day4"))).toBe(9206);
    });
  });
});
