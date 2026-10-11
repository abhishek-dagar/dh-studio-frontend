import { defineConfig } from 'vitest/config';

// Unit tests for the plain TS helpers in src/lib (spec 0002). Pages and islands are checked with /check verify.
export default defineConfig({
  test: {
    include: ['src/lib/**/*.test.ts'],
    environment: 'node',
  },
});
