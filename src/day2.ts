export function isValidIdPart1(n: number): boolean {
  const str = n.toString();

  if (str.length % 2 == 1) {
    return true;
  }

  const start = str.substring(0, str.length / 2);
  return start.repeat(2) != str;
}

export function isValidIdPart2(n: number): boolean {
  const str = n.toString();
  const len = str.length;

  for (let divisor = 2; divisor <= len; divisor++) {
    if (len % divisor != 0) {
      continue;
    }
    const sequenceLength = len / divisor;

    if (str.substring(0, sequenceLength).repeat(divisor) == str) {
      return false;
    }
  }

  return true;
}

export function solve(
  input: string,
  isValidId: (n: number) => boolean,
): number {
  const ranges = input.split(",").map((range) => range.split("-").map(Number));

  return ranges.reduce((acc, [start, end]) => {
    let invalidSum = 0;
    start = start ?? orThrow("no start");
    end = end ?? orThrow("no end");

    for (let n = start; n <= end; ++n) {
      if (!isValidId(n)) {
        invalidSum += n;
      }
    }

    return acc + invalidSum;
  }, 0);
}

const orThrow = (msg: string): never => {
  throw new Error(msg);
};
