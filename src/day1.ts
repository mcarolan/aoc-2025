enum Direction {
  Left,
  Right,
}

type Instruction = { direction: Direction; distance: number };

function parseInstruction(line: string): Instruction {
  line = line.trim();
  const distance = Number(line.substring(1));
  if (line[0] === "L") {
    return { direction: Direction.Left, distance };
  } else if (line[0] === "R") {
    return { direction: Direction.Right, distance };
  } else {
    throw `could not parse instruction '${line}'`;
  }
}

export function part1(input: string): number {
  const lines = input.split("\n");
  const instructions = lines.map(parseInstruction);

  let position = 50;
  let result = 0;

  instructions.forEach((instruction) => {
    const change =
      instruction.direction === Direction.Left
        ? -instruction.distance
        : instruction.distance;
    position += change;
    position %= 100;

    if (position == 0) {
      ++result;
    }
  });
  return result;
}

export function part2(input: string): number {
  const lines = input.split("\n");
  const instructions = lines.map(parseInstruction);

  let position = 50;
  let result = 0;

  instructions.forEach((instruction) => {
    const change = instruction.direction === Direction.Left ? -1 : 1;

    for (let i = 0; i < instruction.distance; ++i) {
      position = (position + change) % 100;
      if (position == 0) {
        result++;
      }
    }
  });
  return result;
}
