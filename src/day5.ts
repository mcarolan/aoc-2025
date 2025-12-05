type Range = { start: number; end: number };

function inRange(range: Range, n: number): boolean {
  return n >= range.start && n <= range.end;
}

function parseRange(s: string): Range {
  const [startPart, endPart] = s.trim().split("-");
  return { start: Number(startPart as string), end: Number(endPart as string) };
}

export function part1(input: string): number {
  const [rangeLines, availableLines] = input.split(/\s*\n\s*\n\s*/);
  const ranges = (rangeLines as string).split("\n").map(parseRange);
  const available = (availableLines as string)
    .split("\n")
    .map((l) => Number(l.trim()));

  return available.reduce(
    (acc, n) => acc + (ranges.some((r) => inRange(r, n)) ? 1 : 0),
    0,
  );
}

function flatten(ranges: Range[]): Range[] {
  if (ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const result: Range[] = [];
  const first: Range = sorted[0] as Range;

  let current: Range = {
    start: first.start,
    end: first.end,
  };
  for (let i = 1; i < sorted.length; i++) {
    const next: Range = sorted[i] as Range;

    if (current.end >= next.start) {
      current.end = Math.max(current.end, next.end);
    } else {
      result.push(current);
      current = { ...next };
    }
  }

  result.push(current);

  return result;
}

export function part2(input: string): number {
  const [rangeLines] = input.split(/\s*\n\s*\n\s*/);
  const ranges = (rangeLines as string).split("\n").map(parseRange);
  const flattened = flatten(ranges);
  return flattened.reduce(
    (acc, range) => acc + (range.end - range.start) + 1,
    0,
  );
}
