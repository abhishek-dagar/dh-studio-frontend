import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buttonClass } from '../lib/ui/button';
import { copyText } from '../lib/ui/clipboard';

interface Props {
  text: string;
  /** `icon` for CodeBlock's bar; `text` for a terminal line, a small secondary button that reads Copy. */
  appearance?: 'icon' | 'text';
}

type CopyState = 'idle' | 'copied' | 'failed';

const MESSAGES: Readonly<Record<CopyState, string>> = {
  idle: '',
  copied: 'Copied',
  failed: 'Copy failed, select the text to copy',
};

const RESET_MS = 2000;

/** Copy button for CodeBlock and CommandLine (spec 0002). The result is announced through a live region. */
export function CopyButton({ text, appearance = 'icon' }: Props) {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state !== 'copied') return;
    const timer = setTimeout(() => setState('idle'), RESET_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => setState((await copyText(text)) ? 'copied' : 'failed');

  if (appearance === 'text') {
    return (
      <>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-9 shrink-0 items-center rounded-button border border-line bg-control px-3 text-caption font-medium whitespace-nowrap text-fg transition-[border-color,background-color] duration-(--dur-fast) hover:border-line-strong active:bg-wash"
        >
          {state === 'copied' ? MESSAGES.copied : 'Copy'}
        </button>
        <span role="status" className="sr-only">
          {MESSAGES[state]}
        </span>
      </>
    );
  }

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
