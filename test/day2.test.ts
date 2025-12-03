import { solve } from "../src/day2";
import { isValidIdPart1, isValidIdPart2 } from "../src/day2";
import { readInput } from "./utils";

describe("day 2", () => {
  describe("part 1", () => {
    const isValidIdExamples = [
      [11, false],
      [22, false],
      [123123, false],
      [38593859, false],
      [123, true],
      [998, true],
    ];

    it.each(isValidIdExamples)("isValidId(%d) = %s", (id, shouldBeValid) => {
      expect(isValidIdPart1(id as number)).toBe(shouldBeValid as boolean);
    });

    test("example part 1", () => {
      const input =
        "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
      expect(solve(input, isValidIdPart1)).toBe(1227775554);
    });

    test("example part 2", () => {
      const input =
        "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
      expect(solve(input, isValidIdPart2)).toBe(4174379265);
    });

    test("input part 1", () => {
      const input = readInput("day2");
      expect(solve(input, isValidIdPart1)).toBe(9188031749);
    });

    test("input", () => {
      const input = readInput("day2");
      expect(solve(input, isValidIdPart2)).toBe(11323661261);
    });
  });
});
