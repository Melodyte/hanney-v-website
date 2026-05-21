export function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    return "234" + cleaned.slice(1);
  }
  if (cleaned.startsWith("+")) {
    return cleaned.slice(1);
  }
  return cleaned;
}
