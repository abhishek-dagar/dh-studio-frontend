// The one clipboard write the copy buttons share. An edge helper: it touches
// navigator, so only islands call it, after a user click.

/** Writes to the clipboard and reports success, never throws (needs a secure context). */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard === undefined) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
