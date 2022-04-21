import { useEffect, useState } from 'react';

import { getPokemon, Pokemon } from 'src/api/pokemons';

import { useBoolean } from './useBoolean';

interface UsePokemonReturn {
  pokemon: Pokemon;
  loading: boolean;
  error?: Error | undefined;
}

export function useFetchPokemon(id: number): UsePokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, , stopLoading] = useBoolean(true);

  useEffect(() => {
    async function fetchPokemon(): Promise<void> {
      try {
        const pokemon = await getPokemon({ id });

        setPokemon(pokemon);
      } catch (err: any) {
        setError(err);
      } finally {
        stopLoading();
      }
    }

    if (loading) {
      fetchPokemon();
    }

    return () => {
      stopLoading();
    };
  }, [loading, stopLoading, id]);

  return {
    pokemon,
    error,
    loading,
  };
}
