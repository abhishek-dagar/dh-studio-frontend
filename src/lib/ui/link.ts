// Text link look (spec 0002), shared by Link.astro and the islands: --fg with
// an underline that darkens on hover, never red.
export const linkClass =
  'text-fg underline decoration-line-strong decoration-1 underline-offset-[3px] transition-[text-decoration-color] duration-(--dur-fast) hover:decoration-fg';
