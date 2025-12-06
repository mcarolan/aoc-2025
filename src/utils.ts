export function splitLines(s: string): string[] {
  return s.split("\n").map((s) => s.trim());
}
