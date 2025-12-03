export function maxJoltage(banks: string, numberOfBatteries: number): number {
  let startIndex = 0;
  let result = "";

  for (
    let currentBattery = 0;
    currentBattery < numberOfBatteries;
    currentBattery++
  ) {
    let biggestJoltage = 0;
    for (
      let i = startIndex;
      i <= banks.length - (numberOfBatteries - currentBattery);
      ++i
    ) {
      const bankValue = Number(banks[i]);

      if (bankValue > biggestJoltage) {
        biggestJoltage = bankValue;
        startIndex = i + 1;
      }
    }
    result += biggestJoltage.toString();
  }

  return Number(result);
}

export function solve(input: string, batteries: number): number {
  const banks = input
    .split("\n")
    .map((line) => maxJoltage(line.trim(), batteries));
  return banks.reduce((acc, value) => acc + value, 0);
}
