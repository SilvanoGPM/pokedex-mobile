interface PokemonRaw {
    id: number;
    name: string;
    types: Array<{ type: { name: string } }>;
    sprites: { front_default: string };
}

interface Pokemon {
    id: number;
    name: string;
    types: string[];
    image: string;
}

export async function getPokemons(total = 150): Promise<Pokemon[]> {
    const pokemons: Pokemon[] = [];

    for (let id = 1; id <= total; id++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonRaw: PokemonRaw = await response.json();

        const pokemon = { 
            ...pokemonRaw,
            types: pokemonRaw.types.map(({ type }) => type.name),
            image: pokemonRaw.sprites.front_default, 
        };

        pokemons.push(pokemon);
    }

    return pokemons;
}
