export function truncateText(text: any, maxLength: number): string {
  if (typeof text !== "string") {
    return "";
  }
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
