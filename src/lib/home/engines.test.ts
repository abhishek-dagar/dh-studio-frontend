import { describe, expect, it } from 'vitest';
import { diagramLayout, laneFor } from './engines';

const keys = ['sqlite', 'postgresql', 'mongodb', 'documentdb', 'mysql', 'redis', 'duckdb', 'oracle'] as const;
const rowsOf = (count: number) => keys.slice(0, count).map((icon) => ({ icon }));

describe('diagramLayout', () => {
  it('alternates sides starting on the left', () => {
    expect(diagramLayout(rowsOf(5)).engines.map((engine) => engine.side)).toEqual(['left', 'right', 'left', 'right', 'left']);
  });

  it('counts sideIndex within each side', () => {
    expect(diagramLayout(rowsOf(5)).engines.map((engine) => engine.sideIndex)).toEqual([0, 0, 1, 1, 2]);
  });

  it('keeps content order and keys', () => {
    expect(diagramLayout(rowsOf(4)).engines.map((engine) => engine.key)).toEqual(['sqlite', 'postgresql', 'mongodb', 'documentdb']);
  });

  it.each([
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 3],
    [8, 4],
  ])('needs %i engines in %i rows per side', (count, rows) => {
    expect(diagramLayout(rowsOf(count)).rowsPerSide).toBe(rows);
  });

  it.each([
    [1, [0]],
    [2, [0, 0]],
    [3, [0, 0, 0]],
    [4, [0, 0, 0, 0]],
    [5, [0, 0, 1, 0, 0]],
    [6, [0, 0, 1, 1, 0, 0]],
    [7, [0, 0, 1, 1, 1, 0, 0]],
    [8, [0, 0, 1, 1, 1, 1, 0, 0]],
  ])('gives %i engines the lanes %j', (count, lanes) => {
    expect(diagramLayout(rowsOf(count)).engines.map((engine) => engine.lane)).toEqual(lanes);
  });

  it('names unique anchors for the hub row and the engine row', () => {
    const anchors = diagramLayout(rowsOf(8)).engines.flatMap((engine) => [engine.hubAnchor, engine.engineAnchor]);
    expect(new Set(anchors).size).toBe(16);
    expect(anchors.slice(0, 2)).toEqual(['--hub-sqlite', '--engine-sqlite']);
  });

  it('gives no engines for an empty list', () => {
    expect(diagramLayout([])).toEqual({ engines: [], rowsPerSide: 0 });
  });
});

describe('laneFor', () => {
  it('steps out then back in on a side of four', () => {
    expect([0, 1, 2, 3].map((index) => laneFor(index, 4))).toEqual([0, 1, 1, 0]);
  });
});
