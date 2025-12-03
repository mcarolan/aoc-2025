import { part1, part2 } from "../src/day1";

import { readInput } from "./utils.test";

describe("day 1", () => {
  describe("part 1", () => {
    test("example part 1", () => {
      const input = `L68
                L30
                R48
                L5
                R60
                L55
                L1
                L99
                R14
                L82`;
      expect(part1(input)).toBe(3);
    });

    test("part1", () => {
      const input = readInput("day1");
      expect(part1(input)).toBe(1195);
    });

    test("example part2", () => {
      const input = `L68
                  L30
                  R48
                  L5
                  R60
                  L55
                  L1
                  L99
                  R14
                  L82`;
      expect(part2(input)).toBe(6);
    });

    test("part2", () => {
      const input = readInput("day1");
      expect(part2(input)).toBe(6770);
    });
  });
});
