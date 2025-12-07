export type RowNumber = number;
export type ColNumber = number;
export type Character = string;
export type Cell<T> =
  | { kind: "occupied"; value: T; position: Position }
  | { kind: "vacant"; position: Position };

export type Position = { row: number; col: number };

export function positionNeighbours(position: Position): Position[] {
  return [
    { row: position.row - 1, col: position.col },
    { row: position.row - 1, col: position.col - 1 },
    { row: position.row - 1, col: position.col + 1 },

    { row: position.row + 1, col: position.col },
    { row: position.row + 1, col: position.col + 1 },
    { row: position.row + 1, col: position.col - 1 },

    { row: position.row, col: position.col + 1 },
    { row: position.row, col: position.col - 1 },
  ];
}

export function positionDown(position: Position): Position {
  return { row: position.row + 1, col: position.col };
}
export function positionLeft(position: Position): Position {
  return { row: position.row, col: position.col - 1 };
}
export function positionRight(position: Position): Position {
  return { row: position.row, col: position.col + 1 };
}
export function positionCantor(position: Position): number {
  return (
    ((position.row + position.col) * (position.row + position.col + 1)) / 2 +
    position.col
  );
}
export function positionFromCantor(cantor: number): Position {
  const w = Math.floor((Math.sqrt(8 * cantor + 1) - 1) / 2);
  const t = (w * (w + 1)) / 2;
  const y = cantor - t;
  const x = w - y;
  return { row: x, col: y };
}

export class Grid<T> {
  private cells: Map<RowNumber, Map<ColNumber, Cell<T>>>;

  private rows: number;
  private cols: number;

  constructor() {
    this.rows = 0;
    this.cols = 0;
    this.cells = new Map();
  }

  static parseInput<T>(
    input: string,
    cellBuilder: (c: Character) => T,
  ): Grid<T> {
    const grid = new Grid<T>();
    const lines = input.split("\n").map((line) => line.trim());

    for (const [rowNumber, line] of lines.entries()) {
      for (let colNumber = 0; colNumber < line.length; ++colNumber) {
        const position: Position = { row: rowNumber, col: colNumber };
        grid.set(position, cellBuilder(line[colNumber] as string));
      }
    }

    return grid;
  }

  set(position: Position, value: T) {
    this.rows = Math.max(this.rows, position.row + 1);
    this.cols = Math.max(this.cols, position.col + 1);

    const row = this.cells.get(position.row) ?? new Map<ColNumber, Cell<T>>();
    row.set(position.col, { kind: "occupied", value, position });
    this.cells.set(position.row, row);
  }

  rowCount(): number {
    return this.rows;
  }

  colCount(): number {
    return this.cols;
  }

  at(position: Position): Cell<T> {
    const row = this.cells.get(position.row);
    const cell = row?.get(position.col);
    return cell ?? { kind: "vacant", position: position };
  }

  getNeighbours(position: Position): Cell<T>[] {
    const result: Cell<T>[] = [];

    for (const neighbourPosition of positionNeighbours(position)) {
      result.push(this.at(neighbourPosition));
    }

    return result;
  }

  [Symbol.iterator](): Iterator<Position> {
    let currentRow = 0;
    let currentCol = 0;

    const rows = this.rows;
    const cols = this.cols;

    return {
      next(): IteratorResult<Position> {
        if (currentCol < cols) {
          return { value: { row: currentRow, col: currentCol++ }, done: false };
        } else if (currentRow < rows - 1) {
          currentCol = 0;
          return {
            value: { row: ++currentRow, col: currentCol++ },
            done: false,
          };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
