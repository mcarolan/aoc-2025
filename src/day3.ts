export function maxJoltagePart1(banks: string): number {
  let maxValue = 0;
  let maxValuePosition = 0;

  for (let i = 0; i < banks.length - 1; ++i) {
    const bankValue = Number(banks[i]);

    if (bankValue > maxValue) {
      maxValue = bankValue;
      maxValuePosition = i;
    }

    if (bankValue == 9) {
      break;
    }
  }

  let maxSecondaryValue = 0;

  for (let i = maxValuePosition + 1; i < banks.length; ++i) {
    const bankValue = Number(banks[i]);
    maxSecondaryValue =
      bankValue > maxSecondaryValue ? bankValue : maxSecondaryValue;
  }

  return Number(maxValue.toString() + maxSecondaryValue.toString());
}

export function part1(input: string): number {
  const banks = input.split("\n").map((line) => maxJoltagePart1(line.trim()));
  return banks.reduce((acc, value) => acc + value, 0);
}
