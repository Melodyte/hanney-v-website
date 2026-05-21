/**
 * CSV export utility for newsletter subscribers.
 */

import type { NewsletterSubscriber } from '../types';

/**
 * Generates a CSV string from an array of newsletter subscribers.
 * The first row is a header row, followed by one row per subscriber.
 *
 * @param subscribers - Array of newsletter subscriber records
 * @returns A valid CSV string with header and data rows
 */
export function exportSubscribersToCSV(subscribers: NewsletterSubscriber[]): string {
  const header = 'id,email,subscribed_at,is_active';

  const rows = subscribers.map((subscriber) => {
    const email = escapeCSVField(subscriber.email);
    const subscribedAt = escapeCSVField(subscriber.subscribed_at);
    const isActive = subscriber.is_active ? 'true' : 'false';
    return `${escapeCSVField(subscriber.id)},${email},${subscribedAt},${isActive}`;
  });

  return [header, ...rows].join('\n');
}

/**
 * Escapes a CSV field value by wrapping in quotes if it contains
 * commas, quotes, or newlines.
 */
function escapeCSVField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
