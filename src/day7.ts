import { lru } from "tiny-lru";
import {
  Character,
  Grid,
  Position,
  positionCantor,
  positionDown,
  positionFromCantor,
  positionLeft,
  positionRight,
} from "./grid";

enum CellType {
  Empty,
  Start,
  Splitter,
}

function cellBuilder(c: Character): CellType {
  switch (c) {
    case "S":
      return CellType.Start;
    case "^":
      return CellType.Splitter;
    case ".":
      return CellType.Empty;
    default:
      throw `unmapped character ${c}`;
  }
}

function findStart(grid: Grid<CellType>): Position {
  let result: Position | undefined;

  for (const pos of grid) {
    const cell = grid.at(pos);

    if (cell.kind == "occupied" && cell.value == CellType.Start) {
      result = pos;
      break;
    }
  }

  if (!result) {
    throw `could not find start in grid!`;
  }
  return result;
}

export function part1(input: string): number {
  const grid = Grid.parseInput(input, cellBuilder);
  const start = findStart(grid);
  let beams = new Set<number>([positionCantor(start)]);
  let splits = 0;

  while (beams.size > 0) {
    let nextBeams = new Set<number>();
    for (const beam of beams) {
      const cellBelow = grid.at(positionDown(positionFromCantor(beam)));

      if (cellBelow.kind == "occupied" && cellBelow.value == CellType.Empty) {
        nextBeams = nextBeams.add(positionCantor(cellBelow.position));
      } else if (
        cellBelow.kind == "occupied" &&
        cellBelow.value == CellType.Splitter
      ) {
        splits++;
        nextBeams = nextBeams.add(
          positionCantor(positionLeft(cellBelow.position)),
        );
        nextBeams = nextBeams.add(
          positionCantor(positionRight(cellBelow.position)),
        );
      }
    }
    beams = nextBeams;
  }

  return splits;
}

export function part2(input: string): number {
  const grid = Grid.parseInput(input, cellBuilder);
  const start = findStart(grid);
  const cache = lru(1000000);

  const splitters = new Set<number>();

  for (const cellPos of grid) {
    const cell = grid.at(cellPos);
    if (cell.kind == "occupied" && cell.value == CellType.Splitter) {
      splitters.add(positionCantor(cellPos));
    }
  }

  const cols = grid.colCount();
  const rows = grid.rowCount();

  function timelines(beam: Position): number {
    const beamCantor = positionCantor(beam);

    if (cache.has(beamCantor)) {
      return cache.get(beamCantor);
    }

    if (splitters.has(positionCantor({ row: beam.row + 1, col: beam.col }))) {
      let a = 0;
      let b = 0;

      if (beam.col - 1 >= 0) {
        a = timelines({ row: beam.row, col: beam.col - 1 });
      }

      if (beam.col + 1 < cols) {
        b = timelines({ row: beam.row, col: beam.col + 1 });
      }

      cache.set(beamCantor, a + b);
      return a + b;
    } else {
      const next = { row: beam.row + 1, col: beam.col };

      if (next.row < rows) {
        const result = timelines(next);
        cache.set(beamCantor, result);
        return result;
      } else {
        cache.set(beamCantor, 1);
        return 1;
      }
    }
  }

  return timelines(start);
}
