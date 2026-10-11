import { cva, type VariantProps } from 'class-variance-authority';

// Button look shared by Button.astro and the islands (spec 0002), so a button
// rendered from Astro and one rendered from React are identical.
export const buttonClass = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-button border',
    'font-medium select-none no-underline',
    'transition-[background-color,border-color,color,translate] duration-(--dur-fast) ease-in-out',
    'active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    '[&_svg]:size-[1.15em] [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        // The only control with a shadow: a soft red pool under it, plus an inset top light.
        primary: [
          'border-action-edge bg-action text-action-fg hover:bg-action-hover active:bg-action-hover',
          'shadow-[0_6px_18px_-8px_color-mix(in_oklab,var(--action)_70%,transparent),inset_0_1px_0_rgb(255_255_255/0.2)]',
        ],
        secondary: 'border-line bg-control text-fg hover:border-line-strong active:bg-wash',
        ghost: 'border-transparent bg-transparent text-fg hover:bg-wash active:bg-wash',
      },
      size: {
        md: 'h-11 px-4 text-body leading-none',
        lg: 'h-13 px-6 text-body leading-none font-semibold',
      },
      iconOnly: {
        true: 'px-0',
        false: '',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'md', class: 'w-11' },
      { iconOnly: true, size: 'lg', class: 'w-13' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonClass>;
export type ButtonVariant = NonNullable<ButtonVariants['variant']>;
export type ButtonSize = NonNullable<ButtonVariants['size']>;
