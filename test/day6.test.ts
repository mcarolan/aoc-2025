import { part1, part2 } from "../src/day6";
import { readExample, readInput } from "./utils";

describe("day 6", () => {
  describe("part 1", () =>
    test("example", () => {
      const input = `123 328  51 64 
             45 64  387 23 
              6 98  215 314
            *   +   *   +  `;
      expect(part1(input)).toBe(4277556);
    }));

  test("input", () => {
    const input = readInput("day6");
    expect(part1(input)).toBe(6378679666679);
  });

  describe("part 2", () => {
    test("example", () => {
      const input = readExample("day6");
      expect(part2(input)).toBe(3263827);
    });

    test("input", () => {
      const input = readInput("day6");
      expect(part2(input)).toBe(11494432585168);
    });
  });
});
