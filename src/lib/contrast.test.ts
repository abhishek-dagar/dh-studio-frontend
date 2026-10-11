import { readFileSync } from 'node:fs';
import { describe as group, expect, it } from 'vitest';
import { CONTRAST_PAIRS } from './contrast-pairs';
import { checkPairs, describe, isPassing, missingRoles, parseTokens } from './contrast';

const css = readFileSync(new URL('../styles/tokens.css', import.meta.url), 'utf8');
const tokens = parseTokens(css);

group('design tokens', () => {
  it('defines every role in both themes', () => {
    expect(missingRoles(tokens)).toEqual([]);
  });

  it('meets WCAG AA for every contrast pair in both themes', () => {
    const failures = checkPairs(tokens, CONTRAST_PAIRS).filter((result) => !isPassing(result)).map(describe);
    expect(failures).toEqual([]);
  });

  it('fails when a token drops below its minimum', () => {
    const weakened = parseTokens(css.replace('--fg-muted: var(--gray-600);', '--fg-muted: #8a8c90;'));
    const failures = checkPairs(weakened, CONTRAST_PAIRS).filter((result) => !isPassing(result)).map(describe);
    expect(failures.length).toBeGreaterThan(0);
    expect(failures.every((line) => line.startsWith('light: --fg-muted'))).toBe(true);
  });

  it('reports a role missing from a theme instead of throwing', () => {
    const broken = parseTokens(css.replace('--signal: var(--green-700);', ''));
    expect(missingRoles(broken)).toContain('--signal is missing from light');
    const failures = checkPairs(broken, CONTRAST_PAIRS).filter((result) => !isPassing(result));
    expect(failures.map(describe)).toContain('light: --signal on --signal-tint: --signal is missing from the light theme');
  });
});
