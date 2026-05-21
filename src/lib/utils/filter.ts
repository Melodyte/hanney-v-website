/**
 * Generic category filter utility.
 * Filters items by a category field, returning all items when "All" is selected.
 */

/**
 * Filters an array of items by their category field.
 * Returns all items when the selected category is "All".
 *
 * @param items - Array of items with a category field
 * @param selectedCategory - The category to filter by, or "All" to return everything
 * @param categoryKey - The key of the category field on each item (defaults to "category")
 * @returns Filtered array of items
 */
export function filterByCategory<T extends Record<string, unknown>>(
  items: T[],
  selectedCategory: string,
  categoryKey: keyof T = 'category' as keyof T
): T[] {
  if (selectedCategory === 'All') {
    return items;
  }

  return items.filter((item) => item[categoryKey] === selectedCategory);
}
