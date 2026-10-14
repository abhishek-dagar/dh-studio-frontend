import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import type { KeyboardEvent } from 'react';

export interface AccordionItem {
  readonly value: string;
  readonly title: string;
  /** Plain text. A blank line starts a new paragraph. */
  readonly body: string;
}

interface Props {
  items: readonly AccordionItem[];
  multiple?: boolean;
}

const paragraphs = (body: string): readonly string[] =>
  body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

// Base UI follows the APG pattern, where arrow keys between headers are optional,
// and leaves them out. Spec 0002 (AC-16) asks for them, so this adds them.
const NAV_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End'] as const;
type NavKey = (typeof NAV_KEYS)[number];

const isNavKey = (key: string): key is NavKey => (NAV_KEYS as readonly string[]).includes(key);

const nextIndex = (key: NavKey, current: number, count: number): number => {
  switch (key) {
    case 'ArrowDown':
      return (current + 1) % count;
    case 'ArrowUp':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
  }
};

const moveBetweenHeaders = (event: KeyboardEvent<HTMLDivElement>): void => {
  if (!isNavKey(event.key)) return;
  const triggers = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]:not(:disabled)')];
  const current = triggers.findIndex((trigger) => trigger === document.activeElement);
  if (current === -1) return;
  event.preventDefault();
  triggers[nextIndex(event.key, current, triggers.length)]?.focus();
};

/**
 * Disclosure list on Base UI (spec 0002). Enter or Space toggles an item;
 * Up, Down, Home and End move between headers. Text renders as text, never HTML.
 */
export function Accordion({ items, multiple = false }: Props) {
  return (
    <BaseAccordion.Root multiple={multiple} onKeyDown={moveBetweenHeaders} className="border-y border-line">
      {items.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value} className="border-b border-line last:border-b-0">
          <BaseAccordion.Header className="m-0">
            <BaseAccordion.Trigger data-accordion-trigger className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-start text-body font-semibold text-fg decoration-1 underline-offset-[3px] hover:underline">
              {item.title}
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-fg-muted transition-transform duration-(--dur-base) ease-in-out group-data-[panel-open]:rotate-180"
              />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height,opacity] duration-(--dur-base) ease-in-out data-[ending-style]:h-0 data-[ending-style]:opacity-0 data-[starting-style]:h-0 data-[starting-style]:opacity-0">
            <div className="flex max-w-(--width-prose) flex-col gap-3 pb-5 text-fg-muted">
              {paragraphs(item.body).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
