export function metersToKilometers(meters: number): string {
  const visibilityInKilometers = meters / 1000;
  return `${visibilityInKilometers.toFixed(0)}km`
}