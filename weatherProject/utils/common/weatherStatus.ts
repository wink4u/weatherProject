export function getWeatherStatusText(sky: number, pty: number): string {
  if (pty > 0) {
    if (pty === 1 || pty === 4) return "약한 비";
    if (pty === 2 || pty === 3) return "눈/비";
  }
  if (sky === 1) return "맑음";
  if (sky === 3) return "구름많음";
  if (sky === 4) return "흐림";
  return "구름많음";
}

export default getWeatherStatusText