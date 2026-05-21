/**
 * Price formatting utility for Nigerian Naira (₦).
 * Formats positive integers with ₦ prefix and comma separators.
 */

/**
 * Formats a price in Naira as a string with ₦ prefix and comma separators.
 * @param priceNaira - A positive integer representing the price in Naira
 * @returns Formatted string like "₦150,000"
 */
export function formatPrice(priceNaira: number): string {
  if (!Number.isFinite(priceNaira) || priceNaira < 0) {
    return '₦0';
  }

  const rounded = Math.round(priceNaira);
  return `₦${rounded.toLocaleString('en-US')}`;
}
