/**
 * Portfolio preview selection utility.
 * Selects 4-8 most recent portfolio items for homepage display.
 */

import type { PortfolioItem } from '../types';

const MIN_PREVIEW_COUNT = 4;
const MAX_PREVIEW_COUNT = 8;

/**
 * Selects portfolio items for the homepage preview section.
 * Returns 4-8 most recent items ordered by creation date descending.
 * Returns an empty array if fewer than 4 items are available
 * (indicating the section should be hidden).
 *
 * @param items - All available portfolio items
 * @returns Array of 4-8 most recent items, or empty array if < 4 available
 */
export function selectPortfolioPreview(items: PortfolioItem[]): PortfolioItem[] {
  if (items.length < MIN_PREVIEW_COUNT) {
    return [];
  }

  const sorted = [...items].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return sorted.slice(0, MAX_PREVIEW_COUNT);
}
