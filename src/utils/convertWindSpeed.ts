export function convertWindSpeed(metersPerSecond: number): string {
  const kmPerHour = metersPerSecond * 3.6; // 1 m/s = 3.6 km/h
  return `${kmPerHour.toFixed(0)}km/h`;
}