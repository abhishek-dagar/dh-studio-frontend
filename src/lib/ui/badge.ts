import { cva, type VariantProps } from 'class-variance-authority';

// Badge look (spec 0002). Signal always pairs its dot with text, so meaning never rests on color.
export const badgeClass = cva(
  'inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 text-caption whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral: 'border-line bg-wash text-fg',
        signal: 'border-transparent bg-signal-tint text-signal',
        outline: 'border-line-strong bg-transparent text-fg-muted',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeClass>['variant']>;
