import { Character, Grid, Position } from "./grid";

enum CellValue {
  Paper,
  Empty,
}

function parseCellValue(c: Character): CellValue {
  switch (c) {
    case "@":
      return CellValue.Paper;
    case ".":
      return CellValue.Empty;
    default:
      throw `could not parse ${c} as a cell value`;
  }
}

function paperSurrounding(grid: Grid<CellValue>, position: Position): number {
  return grid.getNeighbours(position).reduce((acc, cell) => {
    if (cell.kind === "occupied" && cell.value === CellValue.Paper) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
}

export function part1(input: string): number {
  const grid = Grid.parseInput(input, parseCellValue);
  let result = 0;

  for (const position of grid) {
    const here = grid.at(position);

    if (here.kind == "vacant" || here.value == CellValue.Empty) {
      continue;
    }

    if (paperSurrounding(grid, position) < 4) {
      result++;
    }
  }

  return result;
}

function iteration(grid: Grid<CellValue>): [number, Grid<CellValue>] {
  const next = new Grid<CellValue>();

  let updated = 0;

  for (const position of grid) {
    const here = grid.at(position);

    if (here.kind == "vacant") continue;

    if (here.value == CellValue.Empty) {
      next.set(position, here.value);
      continue;
    }

    if (paperSurrounding(grid, position) < 4) {
      updated++;
      next.set(position, CellValue.Empty);
    } else {
      next.set(position, here.value);
    }
  }

  return [updated, next];
}

export function part2(input: string): number {
  let grid = Grid.parseInput(input, parseCellValue);
  let result = 0;

  while (true) {
    const [updated, next] = iteration(grid);
    if (updated == 0) {
      break;
    }

    result += updated;
    grid = next;
  }

  return result;
}
