/**
 * Generate a URL-friendly slug from a string.
 * Lowercases, replaces spaces with hyphens, removes special characters,
 * and appends a short random suffix for uniqueness.
 */
export function generateSlug(text: string): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const suffix = Math.random().toString(36).substring(2, 8);
  return `${base}-${suffix}`;
}
