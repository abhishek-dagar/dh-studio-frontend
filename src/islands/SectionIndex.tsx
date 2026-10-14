import { useEffect, useState } from 'react';
import { badgeClass } from '../lib/ui/badge';
import { activeAnchor, type SectionIndexItem } from '../lib/ui/section-index';

interface Props {
  /** The nav's name, `On this page`. */
  label: string;
  items: readonly SectionIndexItem[];
}

/** Rounding can leave a jumped to section a fraction of a pixel below the line. */
const SUBPIXEL = 1;

const linkClass = [
  'section-index-link flex min-h-9 flex-wrap items-center gap-x-2 gap-y-1 border-s-2 border-transparent py-1 ps-3 text-[0.875rem] text-fg-muted',
  'transition-[border-color,color] duration-(--dur-fast)',
  'hover:text-fg',
  'aria-[current=location]:border-fg aria-[current=location]:font-medium aria-[current=location]:text-fg',
].join(' ');

/**
 * The `On this page` column on wide screens (spec 0008, AC-6; spec 0005, AC-18 to
 * AC-22). Astro renders the links at build time, so they jump with no JavaScript;
 * hydration only adds the mark on the section you are reading. An anchor missing
 * from the page is skipped.
 */
export function SectionIndex({ label, items }: Props) {
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    const anchors = items.flatMap(({ anchor }) => {
      const element = document.getElementById(anchor);
      return element === null ? [] : [{ anchor, element }];
    });
    const first = anchors[0];
    if (first === undefined) return undefined;

    // The reading line is the jump target, so both share the sections' scroll-margin-top.
    const measure = () => {
      const line = Number.parseFloat(getComputedStyle(first.element).scrollMarginTop) || 0;
      const root = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      const tops = anchors.map(({ anchor, element }) => ({ anchor, top: element.getBoundingClientRect().top }));
      setActive(activeAnchor(tops, line + SUBPIXEL, atBottom));
    };

    const frame = { id: 0 };
    const schedule = () => {
      if (frame.id !== 0) return;
      frame.id = requestAnimationFrame(() => {
        frame.id = 0;
        measure();
      });
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('hashchange', schedule);
    return () => {
      cancelAnimationFrame(frame.id);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, [items]);

  return (
    <nav aria-label={label} className="flex flex-col gap-3">
      <p className="text-caption font-medium text-fg-muted" aria-hidden="true">
        {label}
      </p>
      <ol className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.anchor}>
            <a href={`#${item.anchor}`} className={linkClass} aria-current={item.anchor === active ? 'location' : undefined}>
              <span className={item.mono === true ? 'font-mono' : undefined}>{item.label}</span>
              {item.badges?.map((badge) => (
                <span key={badge.label} className={badgeClass({ variant: badge.variant })}>
                  {badge.variant === 'signal' && <span className="size-1.5 rounded-pill bg-signal" aria-hidden="true" />}
                  {badge.label}
                </span>
              ))}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
