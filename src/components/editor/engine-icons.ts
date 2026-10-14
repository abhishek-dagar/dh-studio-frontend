import Database from '@lucide/astro/icons/database';
import MongoDB from '../../assets/icons/databases/mongodb.svg';
import PostgreSQL from '../../assets/icons/databases/postgresql.svg';
import SQLite from '../../assets/icons/databases/sqlite.svg';
import type { EngineIcon } from '../../lib/home/engines';

// One icon per engine key (spec 0003, AC-24; spec 0008, Value sourcing), shared
// by Home's engines diagram and the features page. Simple Icons (CC0), monochrome
// in the current text color. Simple Icons carries no AWS logos, so DocumentDB
// takes the plain lucide database icon.
export const engineIcons = { sqlite: SQLite, postgresql: PostgreSQL, mongodb: MongoDB, documentdb: Database } as const satisfies Record<
  EngineIcon,
  unknown
>;
