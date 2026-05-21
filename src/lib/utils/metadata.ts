/**
 * Page metadata generator utility.
 * Enforces title max 60 chars and description max 160 chars with ellipsis truncation.
 */

const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 160;

export interface PageMetadata {
  title: string;
  description: string;
}

/**
 * Truncates a string to a maximum length, appending "..." if truncated.
 * @param text - The source text to truncate
 * @param maxLength - Maximum allowed length (including ellipsis)
 * @returns The truncated string, or original if within limit
 */
function truncateWithEllipsis(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generates page metadata with enforced length constraints.
 * Title is truncated to 60 characters and description to 160 characters,
 * with "..." appended when truncation occurs.
 *
 * @param title - The source title text
 * @param description - The source description text
 * @returns Metadata object with truncated title and description
 */
export function generateMetadata(title: string, description: string): PageMetadata {
  return {
    title: truncateWithEllipsis(title, MAX_TITLE_LENGTH),
    description: truncateWithEllipsis(description, MAX_DESCRIPTION_LENGTH),
  };
}
