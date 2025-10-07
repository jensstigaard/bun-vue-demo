/**
 * Precision format number
 * Rounds a number to a given precision (default 5)
 */
export function pf(n: number, precision: number = 5): number {
  const scale = 10 ** precision
  return Math.round(n * scale) / scale
}
