import { splitLines } from "./utils";
import { RecordFactory, Record, RecordOf, is, List, Set, Map } from "immutable";

type CoordProps = { x: number; y: number; z: number };
const defaultCoord: CoordProps = { x: 0, y: 0, z: 0 };
const makeCoord: RecordFactory<CoordProps> = Record(defaultCoord);
type Coord = RecordOf<CoordProps>;

function coordToString(coord: Coord): string {
  return `${coord.get("x")},${coord.get("y")},${coord.get("z")}`;
}

function coordFromArray(coord: number[]): Coord {
  return makeCoord({ x: coord[0]!, y: coord[1]!, z: coord[2]! }); // eslint-disable-line @typescript-eslint/no-non-null-assertion
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
  let calculatedDistances: Set<List<Coord>> = Set();
  let distances: List<Distance> = List();

  for (const coord1 of coordinates) {
    for (const coord2 of coordinates) {
      if (is(coord1, coord2)) {
        continue;
      }

      const fromTo = List([coord1, coord2]).sort();
      const from = fromTo.get(0)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      const to = fromTo.get(1)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

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

  let neighbourhoodsByNode = Map<string, number>();
  let nodesByNeighbourhoods = Map<number, Set<string>>();

  let counter = 0;

  for (let i = 0; i < n; ++i) {
    const entry = distances.get(i)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

    const from = coordToString(entry.from);
    const to = coordToString(entry.to);
    const fromNeighbourhood = neighbourhoodsByNode.get(from);
    const toNeighbourhood = neighbourhoodsByNode.get(to);

    if (fromNeighbourhood === undefined && toNeighbourhood === undefined) {
      const newNeighbourhood = counter++;
      neighbourhoodsByNode = neighbourhoodsByNode.set(from, newNeighbourhood);
      neighbourhoodsByNode = neighbourhoodsByNode.set(to, newNeighbourhood);
      nodesByNeighbourhoods = nodesByNeighbourhoods.set(
        newNeighbourhood,
        Set([from, to]),
      );
    } else if (
      fromNeighbourhood === undefined &&
      toNeighbourhood !== undefined
    ) {
      neighbourhoodsByNode = neighbourhoodsByNode.set(from, toNeighbourhood);
      nodesByNeighbourhoods = nodesByNeighbourhoods.set(
        toNeighbourhood,
        nodesByNeighbourhoods.get(toNeighbourhood, Set<string>()).add(from),
      );
    } else if (
      fromNeighbourhood !== undefined &&
      toNeighbourhood === undefined
    ) {
      neighbourhoodsByNode = neighbourhoodsByNode.set(to, fromNeighbourhood);
      nodesByNeighbourhoods = nodesByNeighbourhoods.set(
        fromNeighbourhood,
        nodesByNeighbourhoods.get(fromNeighbourhood, Set<string>()).add(to),
      );
    } else if (
      fromNeighbourhood !== undefined &&
      toNeighbourhood !== undefined &&
      fromNeighbourhood !== toNeighbourhood
    ) {
      //join neighbourhoods
      const toKeep = Math.min(fromNeighbourhood, toNeighbourhood);
      const toDiscard = Math.max(fromNeighbourhood, toNeighbourhood);

      for (const discard of nodesByNeighbourhoods.get(
        toDiscard,
        Set<string>(),
      )) {
        neighbourhoodsByNode = neighbourhoodsByNode.set(discard, toKeep);
        nodesByNeighbourhoods = nodesByNeighbourhoods.set(
          toKeep,
          nodesByNeighbourhoods.get(toKeep, Set<string>()).add(discard),
        );
      }
      nodesByNeighbourhoods = nodesByNeighbourhoods.remove(toDiscard);

      neighbourhoodsByNode = neighbourhoodsByNode.set(from, toKeep);
      neighbourhoodsByNode = neighbourhoodsByNode.set(to, toKeep);
    }
  }

  const biggest = nodesByNeighbourhoods.toList().sortBy((value) => -value.size);

  return biggest.get(0)!.size * biggest.get(1)!.size * biggest.get(2)!.size; // eslint-disable-line @typescript-eslint/no-non-null-assertion
}
