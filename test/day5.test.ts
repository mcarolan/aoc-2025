import { part1, part2 } from "../src/day5";
import { readInput } from "./utils";

describe("day 5", () => {
  describe("part 1", () => {
    test("example", () => {
      const input = `3-5
            10-14
            16-20
            12-18
            
            1
            5
            8
            11
            17
            32`;

      expect(part1(input)).toBe(3);
    });

    test("input", () => {
      const input = readInput("day5");
      expect(part1(input)).toBe(874);
    });
  });

  describe("part 2", () => {
    test("example", () => {
      const input = `3-5
              10-14
              16-20
              12-18
              
              1
              5
              8
              11
              17
              32`;

      expect(part2(input)).toBe(14);
    });

    test("input", () => {
      const input = readInput("day5");
      expect(part2(input)).toBe(348548952146313);
    });
  });
});
