import { describe, expect, it } from 'vitest';
import { supportMatrix, supportProblem, type EngineSupport } from '../../src/lib/features/support';

const engines = [
  { name: 'SQLite', icon: 'sqlite' },
  { name: 'MongoDB', icon: 'mongodb' },
];

const entry = (id: string, tab: string, support: Record<string, EngineSupport>) => ({ id, data: { tab, engines: support } });

const grid = entry('01-table-grid', 'Table grid', { sqlite: { level: 'full' }, mongodb: { level: 'full', note: 'documents as rows' } });
const builder = entry('04-query-builder', 'Query builder', { mongodb: { level: 'partial', note: 'find and filter only' }, sqlite: { level: 'full' } });

describe('supportMatrix', () => {
  it('has one column per engine, in engine order', () => {
    expect(supportMatrix([grid], engines).columns).toEqual([
      { key: 'sqlite', name: 'SQLite' },
      { key: 'mongodb', name: 'MongoDB' },
    ]);
  });

  it('has one row per entry, in the order given, with its slug, tab and cells in engine order', () => {
    expect(supportMatrix([builder, grid], engines).rows).toEqual([
      {
        slug: 'query-builder',
        tab: 'Query builder',
        cells: [
          { key: 'sqlite', level: 'full', note: undefined },
          { key: 'mongodb', level: 'partial', note: 'find and filter only' },
        ],
      },
      {
        slug: 'table-grid',
        tab: 'Table grid',
        cells: [
          { key: 'sqlite', level: 'full', note: undefined },
          { key: 'mongodb', level: 'full', note: 'documents as rows' },
        ],
      },
    ]);
  });
});

describe('supportProblem', () => {
  it('is undefined when every entry names exactly the engine keys', () => {
    expect(supportProblem([grid, builder], engines)).toBeUndefined();
  });

  it('names each entry and the key it is missing', () => {
    const fifth = [...engines, { name: 'Amazon DocumentDB', icon: 'documentdb' }];
    const message = supportProblem([grid, builder], fifth);
    expect(message).toContain('01-table-grid is missing engines.documentdb');
    expect(message).toContain('04-query-builder is missing engines.documentdb');
  });

  it('names an extra key', () => {
    const extra = entry('02-sql-editor', 'SQL editor', { sqlite: { level: 'full' }, mongodb: { level: 'none' }, mysql: { level: 'full' } });
    expect(supportProblem([extra], engines)).toContain('02-sql-editor has unknown engines.mysql');
  });

  it('refuses an engine icon used twice', () => {
    const twice = [...engines, { name: 'SQLite again', icon: 'sqlite' }];
    expect(supportProblem([grid], twice)).toContain('Used more than once: sqlite');
  });
});
