import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buttonClass } from '../lib/ui/button';

interface Props {
  text: string;
}

type CopyState = 'idle' | 'copied' | 'failed';

const MESSAGES: Readonly<Record<CopyState, string>> = {
  idle: '',
  copied: 'Copied',
  failed: 'Copy failed, select the text to copy',
};

const RESET_MS = 2000;

/** Writes to the clipboard and reports success, never throws (needs a secure context). */
const copyText = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard === undefined) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/** Copy button for CodeBlock (spec 0002). The result is announced through a live region. */
export function CopyButton({ text }: Props) {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state !== 'copied') return;
    const timer = setTimeout(() => setState('idle'), RESET_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => setState((await copyText(text)) ? 'copied' : 'failed');

  return (
    <div className="flex items-center gap-2">
      <span role="status" className="text-caption text-fg-muted">
        {MESSAGES[state]}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className={buttonClass({ variant: 'ghost', size: 'md', iconOnly: true })}
      >
        {state === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </button>
    </div>
  );
}
