import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { Info, Keyboard } from 'lucide-react';
import { buttonClass } from '../lib/ui/button';

interface Props {
  /** The trigger's own accessible name. The tip only ever adds to it. */
  label: string;
  tip: string;
  icon?: 'info' | 'keyboard';
  /** Makes the trigger a link instead of a button. */
  href?: string;
}

const ICONS = { info: Info, keyboard: Keyboard } as const;
const HOVER_DELAY_MS = 300;

/**
 * Supplementary tip on Base UI (spec 0002). Opens on hover after a short
 * delay and at once on keyboard focus, stays open while hovered, closes on Escape.
 */
export function Tooltip({ label, tip, icon = 'info', href }: Props) {
  const Icon = ICONS[icon];

  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger
        delay={HOVER_DELAY_MS}
        aria-label={label}
        className={buttonClass({ variant: 'ghost', size: 'md', iconOnly: true })}
        render={href === undefined ? undefined : <a href={href} />}
      >
        <Icon aria-hidden="true" />
      </BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner sideOffset={6} className="z-50">
          <BaseTooltip.Popup className="max-w-72 rounded-field border border-line bg-floating px-3 py-2 text-caption text-fg shadow-(--shadow-floating) transition-opacity duration-(--dur-base) ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
            {tip}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
