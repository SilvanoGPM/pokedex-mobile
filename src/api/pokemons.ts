export interface PokemonPage {
  next: string | null;
  previous: string | null;
  results: Array<{ url: string }>;
}

export interface PokemonRaw {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  moves: Array<{ move: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: { other: { dream_world: { front_default: string } } };
  weight: number;
  height: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  moves: string[];
  stats: Array<{ name: string; value: number }>;
  image: string;
  weight: number;
  height: number;
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

export async function getPokemon({
  url,
  id,
}: {
  url?: string;
  id?: number;
}): Promise<Pokemon> {
  const createdUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url || createdUrl);
  const {
    id: pokeId,
    name,
    types,
    weight,
    sprites,
    abilities,
    height,
    moves,
    stats,
  }: PokemonRaw = await response.json();

  const pokemon: Pokemon = {
    id: pokeId,
    types: types.map(({ type }) => type.name),
    abilities: abilities.map(({ ability }) => ability.name),
    moves: moves.map(({ move }) => move.name),
    stats: stats.map(({ stat, base_stat: baseStat }) => ({
      name: stat.name,
      value: baseStat,
    })),
    image: sprites.other.dream_world.front_default,
    name,
    weight,
    height,
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
  const pokemonsPromises = page.results.map(getPokemon);
  const pokemons = await Promise.all(pokemonsPromises);

  return { pokemons, next: page.next, previous: page.previous };
}
