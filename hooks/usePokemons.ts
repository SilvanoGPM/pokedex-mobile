import { useEffect, useState } from 'react';
import { getPokemons, Pokemon } from '../api/pokemons';
import { useBoolean } from './useBoolean';

type UsePokemonsReturn = {
  pokemons: Pokemon[];
  loading: boolean;
  error?: Error | undefined;
};

export function usePokemons(total = 100): UsePokemonsReturn {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, , stopLoading] = useBoolean(true);

  useEffect(() => {
    async function loadPokemons(): Promise<void> {
      try {
        const pokemonsFound = await getPokemons(5);
        setPokemons(pokemonsFound);
      } catch (err: any) {
        setError(err);
      } finally {
        stopLoading();
      }
    }

    if (loading) {
      loadPokemons();
    }

    return () => {
      stopLoading();
    };
  }, [loading, stopLoading, total]);

  return { pokemons, loading, error };
}
