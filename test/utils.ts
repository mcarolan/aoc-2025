import fs from "fs";
export function readInput(day: string): string {
  return fs.readFileSync(`inputs/${day}.txt`, "utf-8");
}

export function readExample(day: string): string {
  return fs.readFileSync(`examples/${day}.txt`, "utf-8");
}
