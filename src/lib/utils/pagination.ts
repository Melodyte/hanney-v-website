/**
 * Blog pagination utility.
 * Paginates blog posts at 9 posts per page, ordered by date descending.
 */

import type { BlogPost } from '../types';

const POSTS_PER_PAGE = 9;

export interface PaginationResult<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
}

/**
 * Paginates an array of blog posts, ordering by publication date descending.
 * Returns the slice for the requested page along with pagination metadata.
 *
 * @param posts - Array of blog posts to paginate
 * @param page - The page number (1-indexed, minimum 1)
 * @returns Object with items for the page, total pages, and current page number
 */
export function paginatePosts(
  posts: BlogPost[],
  page: number
): PaginationResult<BlogPost> {
  const currentPage = Math.max(1, Math.floor(page));

  // Sort by published_at descending (most recent first), falling back to created_at
  const sorted = [...posts].sort((a, b) => {
    const dateA = a.published_at || a.created_at;
    const dateB = b.published_at || b.created_at;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const items = sorted.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return {
    items,
    totalPages,
    currentPage,
  };
}
