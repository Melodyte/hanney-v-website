/**
 * WhatsApp deep link URL generator for Hanney-V business number.
 */

const BUSINESS_NUMBER = '2348105177258';

/**
 * Generates a WhatsApp deep link URL with a pre-filled message.
 * @param message - The message text to pre-fill in WhatsApp
 * @returns A valid WhatsApp deep link URL
 */
export function generateWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_NUMBER}?text=${encodedMessage}`;
}

/**
 * Generates a WhatsApp order URL for a product.
 * @param productName - The name of the product
 * @param price - The price in Naira
 * @param availability - The availability status
 * @returns A WhatsApp deep link URL with product details pre-filled
 */
export function generateProductOrderUrl(
  productName: string,
  price: number,
  availability: string
): string {
  const message = `Hi, I'd like to order: ${productName}\nPrice: ₦${price.toLocaleString('en-US')}\nAvailability: ${availability}`;
  return generateWhatsAppUrl(message);
}

/**
 * Generates a WhatsApp greeting URL for general inquiries.
 * @returns A WhatsApp deep link URL with a greeting message
 */
export function generateGreetingUrl(): string {
  const message = 'Hello Hanney-V! I would like to make an enquiry.';
  return generateWhatsAppUrl(message);
}
