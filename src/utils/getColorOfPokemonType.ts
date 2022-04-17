const colors = new Map<string, string>(
  Object.entries({
    steel: '#f4f4f4',
    fire: '#fddfdf',
    grass: '#defde0',
    eletric: '#fcf7de',
    water: '#def3fd',
    ice: '#def3fd',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5',
  })
);

export function getColorOfPokemonType(type: string): string {
  const defaultColor = '#ee1515';

  if (colors.has(type)) {
    return colors.get(type) || defaultColor;
  }

  return defaultColor;
}
