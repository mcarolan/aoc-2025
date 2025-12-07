import { Character, Grid } from "../src/grid";

describe("grid", () => {
  test("position iterator", () => {
    const input = `000
        111
        000`;
    const parseCell: (c: Character) => Character = (c) => c;
    const grid = Grid.parseInput(input, parseCell);

    const positions = [...grid];

    expect(positions.length).toBe(9);
    expect(positions.toString()).toBe(
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 1, col: 2 },
      ].toString(),
    );
  });
});
