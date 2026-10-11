import { clsx } from 'clsx';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { InstallCopy } from '../lib/home/download';
import type { InstallCommand } from '../lib/home/install';
import { buttonClass } from '../lib/ui/button';

type CopyState = 'idle' | 'copied' | 'failed';

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

interface Props {
  install: InstallCommand;
  copy: InstallCopy;
  /** Shown above the command when more than one is listed. */
  label?: string | undefined;
  /** The red primary copy button, for the one command that answers the visitor's system. */
  primary: boolean;
  /** For analytics (#10): where this command sits on the page. */
  placement: 'hero' | 'final';
}

/**
 * One install command as a terminal line: the prompt, the command and a copy
 * button. Rendered by the DownloadQuery island, so it works in the built HTML
 * (the text is selectable without JavaScript) and copies once hydrated.
 */
export function InstallCommandLine({ install, copy, label, primary, placement }: Props) {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state !== 'copied') return;
    const timer = setTimeout(() => setState('idle'), RESET_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const onCopy = async () => setState((await copyText(install.command)) ? 'copied' : 'failed');

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      {label !== undefined && <p className="text-caption text-fg-muted">{label}</p>}
      <div className="flex min-w-0 items-center gap-2 rounded-field border border-line bg-surface p-1.5 ps-4">
        {/* Focusable so a keyboard can scroll a command wider than the field. */}
        <code tabIndex={0} className="min-w-0 flex-1 overflow-x-auto py-2 font-mono text-code whitespace-nowrap text-syntax-fg">
          <span aria-hidden="true" className="text-fg-muted select-none">
            {install.prompt}{' '}
          </span>
          {install.command}
        </code>
        <button
          type="button"
          onClick={onCopy}
          className={buttonClass({ variant: primary ? 'primary' : 'secondary', size: 'md' })}
          data-install-target={install.target}
          data-install-placement={placement}
        >
          {state === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span className={clsx(label !== undefined && 'max-sm:sr-only')}>{state === 'copied' ? copy.copied : copy.copy}</span>
          {label !== undefined && <span className="sr-only"> {label}</span>}
        </button>
      </div>
      <span role="status" className={clsx('text-caption text-fg-muted', state !== 'failed' && 'sr-only')}>
        {state === 'copied' ? copy.copied : state === 'failed' ? copy.copyFailed : ''}
      </span>
    </div>
  );
}
