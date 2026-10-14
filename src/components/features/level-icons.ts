import Contrast from '@lucide/astro/icons/contrast';
import Minus from '@lucide/astro/icons/minus';
import { LEVEL_ICONS, type SupportLevel } from '../../lib/features/support';
import { CircleCheck } from '@lucide/astro';

// The icon drawn beside each support level word (spec 0008, AC-3). Always next to
// the word, never alone, so the level never rests on the icon or its color.
const byName = { check: CircleCheck, contrast: Contrast, minus: Minus } as const;

export const levelIcon = (level: SupportLevel) => byName[LEVEL_ICONS[level]];
