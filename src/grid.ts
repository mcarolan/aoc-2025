export type RowNumber = number;
export type ColNumber = number;
export type Character = string;
export type Cell<T> =
  | { kind: "occupied"; value: T; position: Position }
  | { kind: "vacant"; position: Position };

export class Position {
  private rowNumber: RowNumber;
  private colNumber: ColNumber;

  constructor(rowNumber: RowNumber, colNumber: ColNumber) {
    this.rowNumber = rowNumber;
    this.colNumber = colNumber;
  }

  getRow(): RowNumber {
    return this.rowNumber;
  }

  getCol(): ColNumber {
    return this.colNumber;
  }

  getNeighbours(): Position[] {
    const result: Position[] = [];
    for (const rowOffset of [-1, 0, 1]) {
      for (const colOffset of [-1, 0, 1]) {
        if (rowOffset == 0 && colOffset == 0) {
          continue;
        }

        result.push(
          new Position(this.rowNumber + rowOffset, this.colNumber + colOffset),
        );
      }
    }
    return result;
  }
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
        const position: Position = new Position(rowNumber, colNumber);
        grid.set(position, cellBuilder(line[colNumber] as string));
      }
    }

    return grid;
  }

  set(position: Position, value: T) {
    this.rows = Math.max(this.rows, position.getRow() + 1);
    this.cols = Math.max(this.cols, position.getCol() + 1);

    const row =
      this.cells.get(position.getRow()) ?? new Map<ColNumber, Cell<T>>();
    row.set(position.getCol(), { kind: "occupied", value, position });
    this.cells.set(position.getRow(), row);
  }

  at(position: Position): Cell<T> {
    const row = this.cells.get(position.getRow());
    const cell = row?.get(position.getCol());
    return cell ?? { kind: "vacant", position: position };
  }

  getNeighbours(position: Position): Cell<T>[] {
    const result: Cell<T>[] = [];

    for (const neighbourPosition of position.getNeighbours()) {
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
          return { value: new Position(currentRow, currentCol++), done: false };
        } else if (currentRow < rows - 1) {
          currentCol = 0;
          return {
            value: new Position(++currentRow, currentCol++),
            done: false,
          };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
