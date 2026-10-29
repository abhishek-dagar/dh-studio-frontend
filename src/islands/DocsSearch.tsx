import { Search } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { countLabel, RESULT_LIMIT, toHit, type PagefindData, type SearchHit } from '../lib/docs/search';

// The docs search (spec 0009, AC-14). It renders nothing on the server, so no
// dead box shows without JavaScript, and loads Pagefind's index from our own
// origin on first focus or input, never on page load. A plain labelled input
// and a list of links: no combobox role, no arrow keys, no hotkey.

interface SearchCopy {
  readonly label: string;
  readonly placeholder: string;
  readonly loading: string;
  /** `{n}` is replaced by the number of guides found. */
  readonly found: string;
  readonly empty: string;
  readonly devUnavailable: string;
  readonly unavailable: string;
}

interface Props {
  copy: SearchCopy;
  /** Where `pagefind.js` is served, with a trailing slash. */
  basePath: string;
}

interface PagefindResult {
  readonly data: () => Promise<PagefindData>;
}

/** The part of Pagefind's browser API this island uses. */
interface Pagefind {
  readonly init?: () => Promise<void>;
  readonly debouncedSearch: (query: string) => Promise<{ readonly results: readonly PagefindResult[] } | null>;
}

type State =
  | { readonly kind: 'idle' }
  | { readonly kind: 'loading' }
  | { readonly kind: 'results'; readonly total: number; readonly hits: readonly SearchHit[] }
  | { readonly kind: 'empty' }
  | { readonly kind: 'unavailable' };

const loadPagefind = async (basePath: string): Promise<Pagefind | null> => {
  try {
    const url = `${basePath}pagefind.js`;
    const pagefind = (await import(/* @vite-ignore */ url)) as Pagefind;
    await pagefind.init?.();
    return pagefind;
  } catch {
    // The dev server has no index, or the fetch failed: say so, never throw.
    return null;
  }
};

export function DocsSearch({ copy, basePath }: Props) {
  const id = useId();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });
  const pagefind = useRef<Promise<Pagefind | null> | null>(null);
  const latest = useRef('');

  useEffect(() => setMounted(true), []);

  const ensureLoaded = (): Promise<Pagefind | null> => {
    pagefind.current ??= loadPagefind(basePath);
    return pagefind.current;
  };

  const run = async (next: string) => {
    latest.current = next;
    if (next.trim() === '') {
      setState((current) => (current.kind === 'unavailable' ? current : { kind: 'idle' }));
      return;
    }
    setState((current) => (current.kind === 'unavailable' || current.kind === 'results' ? current : { kind: 'loading' }));

    const api = await ensureLoaded();
    if (api === null) {
      setState({ kind: 'unavailable' });
      return;
    }
    const search = await api.debouncedSearch(next);
    // null means a newer query superseded this one.
    if (search === null || latest.current !== next) return;
    const hits = (await Promise.all(search.results.slice(0, RESULT_LIMIT).map((result) => result.data()))).map(toHit);
    if (latest.current !== next) return;
    setState(search.results.length === 0 ? { kind: 'empty' } : { kind: 'results', total: search.results.length, hits });
  };

  if (!mounted) return null;

  const status =
    state.kind === 'loading'
      ? copy.loading
      : state.kind === 'results'
        ? countLabel(state.total, copy.found, copy.empty)
        : state.kind === 'empty'
          ? copy.empty
          : state.kind === 'unavailable'
            ? import.meta.env.DEV
              ? copy.devUnavailable
              : copy.unavailable
            : '';

  return (
    <div role="search" className="docs-search flex flex-col gap-2">
      <label htmlFor={id} className="text-caption font-medium text-fg-muted">
        {copy.label}
      </label>
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
        <input
          id={id}
          type="search"
          autoComplete="off"
          spellCheck={false}
          placeholder={copy.placeholder}
          value={query}
          onFocus={() => void ensureLoaded()}
          onChange={(event) => {
            setQuery(event.target.value);
            void run(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Escape' || query === '') return;
            event.preventDefault();
            setQuery('');
            void run('');
          }}
          className="h-11 w-full min-w-0 rounded-field border border-line-strong bg-ground ps-9 pe-3 text-fg transition-[border-color] duration-(--dur-fast) placeholder:text-fg-muted hover:border-fg-muted"
        />
      </div>
      <p role="status" className={state.kind === 'idle' ? 'sr-only' : 'text-caption text-fg-muted'}>
        {status}
      </p>
      {state.kind === 'results' && (
        <ul className="flex flex-col gap-1">
          {state.hits.map((hit) => (
            <li key={hit.url}>
              <a
                href={hit.url}
                className="flex flex-col gap-1 rounded-field border border-transparent px-3 py-2 transition-[background-color,border-color] duration-(--dur-fast) hover:border-line hover:bg-wash"
              >
                <span className="font-medium text-fg">{hit.title}</span>
                {/* The excerpt is our own page text, reduced to text plus <mark> by cleanExcerpt. */}
                <span className="docs-excerpt text-caption text-fg-muted" dangerouslySetInnerHTML={{ __html: hit.excerpt }} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
