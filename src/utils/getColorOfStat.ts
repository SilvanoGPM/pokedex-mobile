const colors = new Map<string, string>(
  Object.entries({
    hp: '#e74c3c',
    attack: '#f1c40f',
    defense: '#3498db',
    'special-attack': '#f39c12',
    'special-defense': '#2980b9',
    speed: '#2ecc71',
  })
);

export function getColorOfStat(stat: string): string {
  const defaultColor = '#191919';

  if (colors.has(stat)) {
    return colors.get(stat) || defaultColor;
  }

  return defaultColor;
}
