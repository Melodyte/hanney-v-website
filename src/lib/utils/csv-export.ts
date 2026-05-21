import type { NewsletterSubscriber } from '@/lib/types';

export function exportSubscribersToCSV(subscribers: NewsletterSubscriber[]): string {
  const header = 'Email,Subscribed Date,Status';
  const rows = subscribers.map((sub) => {
    const email = sub.email.includes(',') ? `"${sub.email}"` : sub.email;
    const date = new Date(sub.subscribed_at).toLocaleDateString();
    const status = sub.is_active ? 'Active' : 'Inactive';
    return `${email},${date},${status}`;
  });

  return [header, ...rows].join('\n');
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
