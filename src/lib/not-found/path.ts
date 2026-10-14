// The not found page's query path (spec 0006, AC-3). The page inlines this
// function's source into a script that runs before paint, so it must stay self
// contained: no imports, no module values, no helpers outside its body.

/**
 * The visitor's path as the string literal inside `where path = '…'`: decoded
 * (the raw path when decoding fails), capped at `max` characters (cut to one
 * less plus `…`), then each `'` doubled the way SQL escapes it. Capping first
 * means a doubled quote is never split in half.
 */
export const queryPath = (raw: string, max = 64): string => {
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    // A malformed escape such as `%E0%A4%A` stays as typed.
  }
  const chars = Array.from(decoded);
  const capped = chars.length > max ? `${chars.slice(0, max - 1).join('')}…` : decoded;
  return capped.replaceAll("'", "''");
};
