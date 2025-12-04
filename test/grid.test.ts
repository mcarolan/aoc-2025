import { Character, Grid, Position } from "../src/grid";

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
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, 2),
        new Position(1, 0),
        new Position(1, 1),
        new Position(1, 2),
        new Position(2, 0),
        new Position(2, 1),
        new Position(2, 2),
      ].toString(),
    );
  });
});
