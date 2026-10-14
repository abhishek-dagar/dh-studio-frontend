import { defineConfig } from 'vitest/config';

// Unit tests for the plain TS helpers in src/lib (spec 0002). New tests live in
// test/, mirroring src/lib; the older ones still sit next to their source.
// Pages and islands are checked with /check verify.
export default defineConfig({
  test: {
    include: ['test/**/*.test.ts', 'src/lib/**/*.test.ts'],
    environment: 'node',
  },
});
