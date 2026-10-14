// The one name a feature goes by in URLs (spec 0008, Key invariants): the
// section id, its matrix link, its index link and Home's deep link all come
// from here, so they cannot disagree.

/** The entry id without its `NN-` order prefix: `05-compare-tables` → `compare-tables`. */
export const featureSlug = (id: string): string => id.replace(/^\d+-/, '');

/** Where a feature lives on the features page. */
export const featureHref = (id: string): string => `/features/#${featureSlug(id)}`;
