import { useCallback, useEffect, useState } from 'react';

import { getPokemons, GetPokemonsParams, Pokemon } from 'src/api/pokemons';

import { useBoolean } from './useBoolean';

interface UsePokemonsReturn {
  pokemons: Pokemon[];
  loading: boolean;
  error?: Error | undefined;
  nextPage: () => void;
}

interface ListInfo {
  next: string | null;
  previous: string | null;
}

export function usePokemons(limit = 10, offset = 0): UsePokemonsReturn {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [listInfo, setListInfo] = useState<ListInfo>({
    next: null,
    previous: null,
  });

  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, startLoading, stopLoading] = useBoolean(true);

  const loadPokemons = useCallback(
    async (params: GetPokemonsParams) => {
      try {
        startLoading();

        const { pokemons, next, previous } = await getPokemons(params);

        setPokemons((state) => [...state, ...pokemons]);
        setListInfo({ next, previous });
      } catch (err: any) {
        setError(err);
      } finally {
        stopLoading();
      }
    },
    [stopLoading, startLoading]
  );

  useEffect(() => {
    loadPokemons({ limit, offset });
  }, [loadPokemons, limit, offset]);

  const nextPage = useCallback(() => {
    const { next } = listInfo;

    if (next) {
      loadPokemons({ superUrl: next });
    }
  }, [listInfo, loadPokemons]);

  return { pokemons, loading, error, nextPage };
}
