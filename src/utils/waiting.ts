export function waiting(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
