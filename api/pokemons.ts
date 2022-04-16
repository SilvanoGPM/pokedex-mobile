export interface PokemonRaw {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string };
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

async function toPokemon(value: any, index: number): Promise<Pokemon> {
  const id = index + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonRaw: PokemonRaw = await response.json();

  const pokemon = {
    id: pokemonRaw.id,
    name: pokemonRaw.name,
    types: pokemonRaw.types.map(({ type }) => type.name),
    image: pokemonRaw.sprites.front_default,
  };

  return pokemon;
}

export async function getPokemons(total = 150): Promise<Pokemon[]> {
  const pokemonsPromises = Array(total).fill(0).map(toPokemon);
  return Promise.all(pokemonsPromises);
}
