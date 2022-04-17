export interface PokemonPage {
  next: string | null;
  previous: string | null;
  results: Array<{ url: string }>;
}

export interface PokemonRaw {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: { other: { dream_world: { front_default: string } } };
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

export interface GetPokemonsReturn {
  pokemons: Pokemon[];
  next: string | null;
  previous: string | null;
}

export interface GetPokemonsParams {
  limit?: number;
  offset?: number;
  superUrl?: string;
}

async function toPokemon({ url }: { url: string }): Promise<Pokemon> {
  const response = await fetch(url);
  const pokemonRaw: PokemonRaw = await response.json();

  const pokemon = {
    id: pokemonRaw.id,
    name: pokemonRaw.name,
    types: pokemonRaw.types.map(({ type }) => type.name),
    image: pokemonRaw.sprites.other.dream_world.front_default,
  };

  return pokemon;
}

export async function getPokemons({
  limit = 10,
  offset = 0,
  superUrl,
}: GetPokemonsParams): Promise<GetPokemonsReturn> {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const result = await fetch(superUrl || url);
  const page: PokemonPage = await result.json();
  const pokemonsPromises = page.results.map(toPokemon);
  const pokemons = await Promise.all(pokemonsPromises);

  return { pokemons, next: page.next, previous: page.previous };
}
