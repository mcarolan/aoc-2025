/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { splitLines } from "./utils";
import {
  RecordFactory,
  Record,
  RecordOf,
  is,
  List,
  Set as ImmSet,
} from "immutable";

type CoordProps = { x: number; y: number; z: number };
const defaultCoord: CoordProps = { x: 0, y: 0, z: 0 };
const makeCoord: RecordFactory<CoordProps> = Record(defaultCoord);
type Coord = RecordOf<CoordProps>;

function coordToString(coord: Coord): string {
  return `${coord.get("x")},${coord.get("y")},${coord.get("z")}`;
}

function coordFromArray(coord: number[]): Coord {
  return makeCoord({ x: coord[0]!, y: coord[1]!, z: coord[2]! });
}

function straightLineDistance(p: Coord, q: Coord): number {
  return Math.sqrt(
    Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2),
  );
}

export function part1(input: string, n: number): number {
  const coordinates = splitLines(input).map((l) =>
    coordFromArray(l.split(",").map(Number)),
  );

  type Distance = { from: Coord; to: Coord; value: number };
  let calculatedDistances: ImmSet<List<Coord>> = ImmSet();
  let distances: List<Distance> = List();

  for (const coord1 of coordinates) {
    for (const coord2 of coordinates) {
      if (is(coord1, coord2)) {
        continue;
      }

      const fromTo = List([coord1, coord2]).sort();
      const from = fromTo.get(0)!;
      const to = fromTo.get(1)!;

      if (!calculatedDistances.has(fromTo)) {
        calculatedDistances = calculatedDistances.add(fromTo);
        distances = distances.push({
          from,
          to,
          value: straightLineDistance(from, to),
        });
      }
    }
  }

  distances = distances.sortBy((d) => d.value);

  const neighbourhoodsByNode = new Map<string, number>();
  const nodesByNeighbourhoods = new Map<number, Set<string>>();

  let counter = 0;

  for (let i = 0; i < n; ++i) {
    const entry = distances.get(i)!;

    const from = coordToString(entry.from);
    const to = coordToString(entry.to);
    const fromNeighbourhood = neighbourhoodsByNode.get(from);
    const toNeighbourhood = neighbourhoodsByNode.get(to);

    if (fromNeighbourhood === undefined && toNeighbourhood === undefined) {
      const newNeighbourhood = counter++;
      neighbourhoodsByNode.set(from, newNeighbourhood);
      neighbourhoodsByNode.set(to, newNeighbourhood);
      nodesByNeighbourhoods.set(newNeighbourhood, new Set([from, to]));
    } else if (
      fromNeighbourhood === undefined &&
      toNeighbourhood !== undefined
    ) {
      neighbourhoodsByNode.set(from, toNeighbourhood);
      const toNeighbourSet = nodesByNeighbourhoods.get(toNeighbourhood);
      toNeighbourSet?.add(from);
    } else if (
      fromNeighbourhood !== undefined &&
      toNeighbourhood === undefined
    ) {
      neighbourhoodsByNode.set(to, fromNeighbourhood);
      const fromNeighbourSet = nodesByNeighbourhoods.get(fromNeighbourhood);
      fromNeighbourSet?.add(to);
    } else if (
      fromNeighbourhood !== undefined &&
      toNeighbourhood !== undefined &&
      fromNeighbourhood !== toNeighbourhood
    ) {
      const toKeep = Math.min(fromNeighbourhood, toNeighbourhood);
      const toDiscard = Math.max(fromNeighbourhood, toNeighbourhood);

      for (const discard of nodesByNeighbourhoods.get(toDiscard)!) {
        neighbourhoodsByNode.set(discard, toKeep);
        const toKeepSet = nodesByNeighbourhoods.get(toKeep);
        toKeepSet?.add(discard);
      }
      nodesByNeighbourhoods.delete(toDiscard);

      neighbourhoodsByNode.set(from, toKeep);
      neighbourhoodsByNode.set(to, toKeep);
    }
  }

  const sizes: number[] = [];
  for (const neighbourhood of nodesByNeighbourhoods.values()) {
    sizes.push(neighbourhood.size);
  }

  sizes.sort((n1, n2) => n1 - n2);

  return (
    sizes[sizes.length - 1]! *
    sizes[sizes.length - 2]! *
    sizes[sizes.length - 3]!
  );
}
