import { Select } from '@base-ui/react/select';
import { clsx } from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { Fragment, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import {
  OS_ORDER,
  rowsFor,
  type DownloadCopy,
  type DownloadData,
  type DownloadEntry,
  type InstallCopy,
  type LaunchTip,
  type LaunchTips,
  type QueryCopy,
  type QueryState,
} from '../lib/home/download';
import { osName } from '../lib/home/format';
import { installCommandsFor } from '../lib/home/install';
import { detectPlatform, type Detected, type PlatformHints } from '../lib/platform/detect';
import type { Os } from '../lib/release/types';
import { buttonClass } from '../lib/ui/button';
import { linkClass } from '../lib/ui/link';
import { resultClass, resultGridClass } from '../lib/ui/result';
import { syntaxClass, type SyntaxKind } from '../lib/ui/syntax';
import { InstallCommandLine } from './InstallCommand';

interface Props {
  data: DownloadData;
  copy: { readonly query: QueryCopy; readonly download: DownloadCopy; readonly install: InstallCopy };
  tips: LaunchTips;
  /** `hero` is the full query and result; `compact` is the closing section's short form. */
  form?: 'hero' | 'compact';
  /** The heading line, rendered by Astro as line 1 of the editor. */
  children?: ReactNode;
}

type FormProps = Omit<Props, 'form'>;

type Choice = Os | 'all';

// The browser side of navigator the detection reads. userAgentData is Chromium only.
type UaData = {
  readonly platform?: string;
  readonly getHighEntropyValues?: (hints: readonly string[]) => Promise<{ readonly architecture?: string }>;
};

const uaData = (): UaData | undefined => (navigator as Navigator & { userAgentData?: UaData }).userAgentData;

const readHints = (): PlatformHints => ({
  userAgent: navigator.userAgent,
  uaPlatform: uaData()?.platform,
  maxTouchPoints: navigator.maxTouchPoints,
});

// Chromium's architecture hint. Missing, rejected or never answered all mean unknown.
const readArchitecture = async (): Promise<string | undefined> => {
  try {
    return (await uaData()?.getHighEntropyValues?.(['architecture']))?.architecture;
  } catch {
    return undefined;
  }
};

const Tok = ({ kind, children }: { kind: SyntaxKind; children: ReactNode }) => (
  <span className={syntaxClass(kind)}>{children}</span>
);

/** One counted editor line, the same markup EditorLine.astro renders. */
const Line = ({ hidden = false, children }: { hidden?: boolean; children: ReactNode }) => (
  <div className="editor-line" aria-hidden={hidden ? 'true' : undefined}>
    <div className="editor-line-text">{children}</div>
  </div>
);

/** `('macos', 'windows', 'linux')`, the literals of the built `in (...)` list. */
const OsList = () => (
  <>
    <Tok kind="punctuation">(</Tok>
    {OS_ORDER.map((os, index) => (
      <Fragment key={os}>
        {index > 0 && <Tok kind="punctuation">, </Tok>}
        <Tok kind="string">'{os}'</Tok>
      </Fragment>
    ))}
    <Tok kind="punctuation">)</Tok>
  </>
);

const OPTIONS: readonly Choice[] = [...OS_ORDER, 'all'];

const triggerClass = clsx(
  'cursor-pointer rounded-inset text-syntax-string decoration-dotted decoration-1 underline-offset-4',
  'hover:underline focus-visible:underline data-[popup-open]:underline',
);

const itemClass = clsx(
  'grid cursor-default grid-cols-[1rem_auto_1fr] items-center gap-2 rounded-inset py-1.5 ps-2 pe-3 outline-none',
  'data-[highlighted]:bg-wash',
);

/**
 * Detects the visitor's system once after hydration (spec 0003, State
 * transitions). Fallback data never detects. A Mac can move from Apple silicon
 * to Intel once, when Chromium answers x86, and never back; `onIntel` lets the
 * caller follow that move.
 */
const useDetection = (data: DownloadData, onDetect: (first: Detected) => void, onIntel: () => void): Detected | null => {
  const [detected, setDetected] = useState<Detected | null>(null);

  useEffect(() => {
    if (data.status !== 'live') return;
    let active = true;
    const first = detectPlatform(readHints());
    setDetected(first);
    onDetect(first);

    if (first.kind === 'desktop' && first.os === 'macos') {
      void readArchitecture().then((architecture) => {
        const refined = detectPlatform({ ...readHints(), architecture });
        if (!active || refined.kind !== 'desktop' || refined.arch !== 'x64') return;
        setDetected(refined);
        onIntel();
      });
    }
    return () => {
      active = false;
    };
    // Detection runs once per load; the callbacks only set state, so they are left out.
  }, [data.status]);

  return detected;
};

/** The first launch tip (AC-7): shown after a macOS or Windows download, hidden on request. */
const useTip = (tips: LaunchTips) => {
  const [tip, setTip] = useState<Os | null>(null);
  const lastDownload = useRef<HTMLAnchorElement | null>(null);

  const onDownload = (entry: DownloadEntry) => (event: MouseEvent<HTMLAnchorElement>) => {
    // A plain link starts the download; this only adds the tip beside it.
    lastDownload.current = event.currentTarget;
    if (tips[entry.os] !== undefined) setTip(entry.os);
  };

  const hideTip = () => {
    setTip(null);
    if (lastDownload.current?.isConnected) lastDownload.current.focus();
  };

  return { shownTip: tip === null ? undefined : tips[tip], onDownload, hideTip };
};

/** The polite live region that holds the tip. Always present, so the announcement is heard. */
const TipRegion = ({ tip, hideLabel, onHide }: { tip: LaunchTip | undefined; hideLabel: string; onHide: () => void }) => (
  <div aria-live="polite">
    {tip !== undefined && (
      <div className="mt-4 rounded-field border border-line bg-surface p-4 md:ps-5">
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold text-fg">{tip.title}</p>
          <button type="button" onClick={onHide} className={buttonClass({ variant: 'ghost', className: '-my-2 -me-2' })}>
            {hideLabel}
          </button>
        </div>
        <ol className="mt-2 flex list-decimal flex-col gap-1 ps-5 text-fg marker:text-fg-muted">
          {tip.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {tip.command !== undefined && (
          <pre className="mt-3 overflow-x-auto rounded-field border border-line bg-ground px-3 py-2 font-mono text-[0.8125rem] text-fg">
            <code>{tip.command}</code>
          </pre>
        )}
      </div>
    )}
  </div>
);

/**
 * The one line install in place of a download button: one command for a
 * picked OS (with the red copy button), both when the query returns every
 * system. The Linux note shows wherever the shell script can land on Linux.
 */
const InstallBlock = ({
  state,
  copy,
  placement,
  withIntro,
}: {
  state: QueryState;
  copy: InstallCopy;
  placement: 'hero' | 'final';
  withIntro: boolean;
}) => {
  const commands = installCommandsFor(state);
  const single = commands.length === 1;
  const linux = state.kind === 'all' || state.os === 'linux';
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {withIntro && (
        <div className="flex max-w-(--width-prose) flex-col gap-1">
          <p className="font-medium text-fg">{copy.heading}</p>
          <p className="text-fg-muted">{copy.note}</p>
        </div>
      )}
      {commands.map((install) => (
        <InstallCommandLine
          key={install.target}
          install={install}
          copy={copy}
          label={single ? undefined : install.target === 'unix' ? copy.unixLabel : copy.windowsLabel}
          primary={single}
          placement={placement}
        />
      ))}
      {linux && <p className="text-caption text-fg-muted">{copy.linuxNote}</p>}
    </div>
  );
};

/**
 * The download island (spec 0003). `hero` renders the full query and result;
 * `compact` renders the closing section's short form (AC-22).
 */
export function DownloadQuery({ form = 'hero', ...props }: Props) {
  return form === 'compact' ? <CompactDownload {...props} /> : <HeroQuery {...props} />;
}

/**
 * The hero's download query (spec 0003, AC-1 to AC-9, AC-11, AC-12). Renders
 * the editor pane around the Astro headline: the where line, the result grid
 * of release files, the status bar and the first launch tip. The built HTML is
 * the `in (...)` query with every file; after hydration it detects the system,
 * narrows to that OS with its primary highlighted, and reveals the rows once.
 */
function HeroQuery({ data, copy, tips, children }: FormProps) {
  const live = data.status === 'live';
  const [query, setQuery] = useState<QueryState>({ kind: 'all' });
  const detected = useDetection(
    data,
    (first) => {
      if (first.kind === 'desktop') setQuery({ kind: 'os', os: first.os, arch: first.arch, detected: true });
    },
    () =>
      setQuery((current) =>
        current.kind === 'os' && current.os === 'macos' && current.detected ? { ...current, arch: 'x64' } : current,
      ),
  );
  const { shownTip, onDownload, hideTip } = useTip(tips);

  const pending = live && detected === null;
  const interactive = live && detected !== null;
  const mine = detected?.kind === 'desktop' ? detected : undefined;
  const { rows, primary } = data.status === 'live' ? rowsFor(data.downloads, query) : { rows: [], primary: undefined };

  const choose = (value: Choice | null) => {
    if (value === null) return;
    if (value === 'all') {
      setQuery({ kind: 'all' });
      return;
    }
    const isMine = mine?.os === value;
    setQuery({ kind: 'os', os: value, arch: isMine ? mine.arch : undefined, detected: isMine });
  };

  const value = query.kind === 'os' ? <Tok kind="string">'{query.os}'</Tok> : <OsList />;
  const triggerLabel = copy.query.triggerLabel.replace(
    '{os}',
    query.kind === 'os' ? osName(query.os) : copy.query.everySystem,
  );
  // Rows and status bar wait for detection, then reveal once (base.css and Hero.astro).
  const hold = live ? { 'data-dq-hold': '', 'data-reveal': '', 'data-revealed': pending ? undefined : '' } : {};

  return (
    <div data-dq-state={pending ? 'pending' : 'ready'}>
      <div className="editor-pane">
        <div className="editor-tabs" aria-hidden="true">
          <span className="editor-tab" data-current="">
            welcome.sql
          </span>
        </div>

        <div className="editor-code">
          {children}
          <div role="group" aria-label="Downloads for">
            <Line hidden>
              <Tok kind="keyword">select</Tok> file<Tok kind="punctuation">,</Tok> for<Tok kind="punctuation">,</Tok> size
            </Line>
            <Line hidden>
              <Tok kind="keyword">from</Tok> downloads
            </Line>
            <Line>
              <span aria-hidden="true">
                <Tok kind="keyword">where</Tok> os{' '}
                {query.kind === 'os' ? <Tok kind="punctuation">=</Tok> : <Tok kind="keyword">in</Tok>}{' '}
              </span>
              {interactive ? (
                <Select.Root<Choice> value={query.kind === 'os' ? query.os : 'all'} onValueChange={choose}>
                  <Select.Trigger aria-label={triggerLabel} className={triggerClass}>
                    {value}
                    <ChevronDown aria-hidden="true" className="ms-0.5 inline size-[1em] align-[-0.125em] text-fg-muted" />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner alignItemWithTrigger={false} side="bottom" align="start" sideOffset={6} className="z-50">
                      <Select.Popup className="min-w-52 rounded-field border border-line bg-floating p-1 text-[0.875rem] text-fg shadow-(--shadow-floating) outline-none transition-opacity duration-(--dur-base) ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
                        {OPTIONS.map((option) => (
                          <Select.Item
                            key={option}
                            value={option}
                            label={option === 'all' ? copy.query.everySystem : osName(option)}
                            className={itemClass}
                          >
                            <Select.ItemIndicator className="flex text-fg">
                              <Check aria-hidden="true" className="size-4" />
                            </Select.ItemIndicator>
                            {option === 'all' ? (
                              <Select.ItemText className="col-span-2 col-start-2">{copy.query.everySystem}</Select.ItemText>
                            ) : (
                              <>
                                <Select.ItemText className="col-start-2 font-mono text-[0.8125rem] text-syntax-string">
                                  '{option}'
                                </Select.ItemText>
                                <span className="text-fg-muted">{osName(option)}</span>
                              </>
                            )}
                          </Select.Item>
                        ))}
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              ) : (
                <span aria-hidden="true">{value}</span>
              )}
              <span aria-hidden="true">
                <Tok kind="punctuation">;</Tok>
                {query.kind === 'os' && query.detected && <Tok kind="comment">{`   -- ${copy.query.yourSystemComment}`}</Tok>}
              </span>
            </Line>
            {detected?.kind === 'other' && query.kind === 'all' && (
              <Line>
                <Tok kind="comment">-- {copy.query.otherComment}</Tok>
              </Line>
            )}
          </div>
        </div>

        <div className="editor-result" {...hold} data-dq-reserve="">
          <table
            id="download"
            className={clsx(resultGridClass({ stack: true }), 'scroll-mt-[calc(var(--header-offset)+var(--header-h)+1rem)]')}
            role="table"
          >
            <caption className="sr-only">Downloads</caption>
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader">
                  file
                </th>
                <th scope="col" role="columnheader">
                  for
                </th>
                <th scope="col" role="columnheader">
                  size
                </th>
                <th scope="col" role="columnheader">
                  <span className="sr-only">{copy.download.rowLink}</span>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {data.status === 'live' ? (
                rows.map((entry) => {
                  const isPrimary = entry === primary;
                  const download = {
                    href: entry.url,
                    onClick: onDownload(entry),
                    'data-download-os': entry.os,
                    'data-download-arch': entry.arch,
                    'data-download-format': entry.format,
                    'data-download-placement': isPrimary ? 'hero' : 'hero-row',
                  };
                  return (
                    <tr key={entry.url} role="row" data-current={isPrimary ? '' : undefined}>
                      <th scope="row" role="rowheader" data-label="file" className={clsx(resultClass.mono, 'max-md:col-span-full')}>
                        {entry.fileName}
                      </th>
                      <td role="cell" data-label="for">
                        {entry.forLabel}
                      </td>
                      <td role="cell" data-label="size" className={resultClass.mono}>
                        {entry.sizeLabel}
                      </td>
                      <td role="cell" className={resultClass.action}>
                        <a {...download} className={clsx(linkClass, 'inline-flex items-center max-md:min-h-11')}>
                          {copy.download.rowLink}
                          <span className="sr-only"> {entry.fileName}</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr role="row">
                  <td role="cell" colSpan={4} className="max-md:col-span-full">
                    {copy.download.fallbackRow}{' '}
                    <a href={data.releasesPageUrl} className={linkClass}>
                      {copy.download.seeReleases}
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={resultClass.statusBar} {...hold}>
          <span>
            {rows.length} {copy.download.rowsWord}
          </span>
          {data.status === 'live' && (
            <span className="flex flex-wrap gap-x-4">
              <span>
                {copy.download.versionPrefix}{' '}
                <a href={data.pageUrl} className="underline decoration-line-strong underline-offset-[3px] hover:text-fg hover:decoration-fg">
                  {data.version}
                </a>
              </span>
              <span>
                {copy.download.releasedWord} <time dateTime={data.publishedAt}>{data.dateLabel}</time>
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 md:ps-[calc(1px+var(--editor-gutter)+var(--editor-code-gap))]" {...hold}>
        <InstallBlock state={query} copy={copy.install} placement="hero" withIntro />
      </div>

      <TipRegion tip={shownTip} hideLabel={copy.download.hideTip} onHide={hideTip} />
    </div>
  );
}

const compactLinkClass = clsx(linkClass, 'inline-flex min-h-11 items-center');

/**
 * The closing section's download (spec 0003, AC-22). It shares the hero's
 * detection and tip but has no query, trigger or rows: the detected primary
 * button, plain links to that OS's other files, and "All systems" back to the
 * hero grid. Built HTML (and no JavaScript) holds a neutral link to the grid;
 * a phone gets the desktop comment and "All systems"; fallback data links to
 * the GitHub releases page (AC-8).
 */
function CompactDownload({ data, copy, tips, children }: FormProps) {
  const detected = useDetection(
    data,
    () => undefined,
    () => undefined,
  );
  const { shownTip, onDownload, hideTip } = useTip(tips);

  const mine = detected?.kind === 'desktop' ? detected : undefined;
  const picked =
    data.status === 'live' && mine !== undefined
      ? rowsFor(data.downloads, { kind: 'os', os: mine.os, arch: mine.arch, detected: true })
      : undefined;

  const fileLink = (entry: DownloadEntry) => ({
    href: entry.url,
    onClick: onDownload(entry),
    'data-download-os': entry.os,
    'data-download-arch': entry.arch,
    'data-download-format': entry.format,
    'data-download-placement': 'final',
  });

  const allSystems = (
    <a href="#download" className={compactLinkClass}>
      {copy.download.allSystems}
    </a>
  );

  // A phone gets no command (DH Studio runs on a computer), only the way back to every file.
  const showInstall = detected?.kind !== 'other';
  const installState: QueryState = mine === undefined ? { kind: 'all' } : { kind: 'os', os: mine.os, arch: mine.arch, detected: true };

  const links =
    data.status === 'fallback' ? (
      <a href={data.releasesPageUrl} className={compactLinkClass}>
        {copy.download.fallback}
      </a>
    ) : (
      <>
        {picked?.rows.map((entry) => (
          <a key={entry.url} {...fileLink(entry)} className={compactLinkClass}>
            {entry.forLabel}
            <span className="sr-only"> ({entry.fileName})</span>
          </a>
        ))}
        {allSystems}
      </>
    );

  return (
    <div>
      <div className="editor-pane">
        <div className="editor-tabs" aria-hidden="true">
          <span className="editor-tab" data-current="">
            get.sql
          </span>
        </div>
        <div className="editor-code">
          {children}
          {detected?.kind === 'other' && (
            <Line>
              <Tok kind="comment">-- {copy.query.otherComment}</Tok>
            </Line>
          )}
          <div className="mt-5 flex flex-col gap-3 font-sans text-[1rem] leading-normal md:ps-[calc(var(--editor-gutter)+var(--editor-code-gap))] md:pe-5">
            {showInstall && <InstallBlock state={installState} copy={copy.install} placement="final" withIntro={false} />}
            <div className="flex flex-wrap items-center gap-x-6">{links}</div>
          </div>
        </div>
      </div>
      <TipRegion tip={shownTip} hideLabel={copy.download.hideTip} onHide={hideTip} />
    </div>
  );
}
