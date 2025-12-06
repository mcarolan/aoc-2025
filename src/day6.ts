import { splitLines } from "./utils";

enum Operator {
  Multiply,
  Add,
}

function parseOperator(s: string): Operator {
  switch (s) {
    case "+":
      return Operator.Add;
    case "*":
      return Operator.Multiply;
    default:
      throw `unknown operator: ${s}`;
  }
}

function operatorFunction(
  operator: Operator,
): (x: number, y: number) => number {
  switch (operator) {
    case Operator.Add:
      return (x, y) => x + y;
    case Operator.Multiply:
      return (x, y) => x * y;
  }
}

function operatorIdentity(operator: Operator): number {
  switch (operator) {
    case Operator.Add:
      return 0;
    case Operator.Multiply:
      return 1;
  }
}

export function part1(input: string): number {
  const lines = splitLines(input);
  const numbers = lines.slice(0, lines.length - 1).map((line) => {
    return line.split(/\s+/).map((s) => Number(s));
  });
  const operators =
    lines[lines.length - 1]?.split(/\s+/).map(parseOperator) ?? [];

  return operators.reduce((acc, operator, i) => {
    const operands = numbers.map((line, j) => {
      const number = line[i];
      if (number) {
        return number;
      } else {
        throw `no number at column ${i} on line ${j}`;
      }
    });

    return (
      acc +
      operands.reduce(
        (acc, n) => operatorFunction(operator)(acc, n),
        operator == Operator.Add ? 0 : 1,
      )
    );
  }, 0);
}

export function part2(input: string): number {
  const lines = input.split("\n");

  const numberLines = lines.slice(0, lines.length - 1);
  const operators =
    lines[lines.length - 1]?.trim()?.split(/\s+/).map(parseOperator) ?? [];

  const rotatedLines = Array.from(
    { length: numberLines[0]?.length ?? 0 },
    () => "",
  );

  for (let j = 0; j < (numberLines[0]?.length ?? 0); ++j) {
    for (let i = 0; i < numberLines.length; ++i) {
      rotatedLines[j] += (numberLines[i]?.[j] ?? "").trim();
    }
  }
  const rotatedLinesString = rotatedLines.join("\n");

  const operandGroups = rotatedLinesString
    .split("\n\n")
    .map((s) => s.split("\n").map(Number));

  let result = 0;

  for (let i = 0; i < operators.length; ++i) {
    const operator = operators[i] as Operator;
    const operands = operandGroups[i] as number[];

    const id = operatorIdentity(operator);
    const f = operatorFunction(operator);

    result += operands.reduce((acc, n) => f(acc, n), id);
  }

  return result;
}
