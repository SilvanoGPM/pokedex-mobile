import { useCallback, useEffect, useState } from 'react';

import { getPokemons, GetPokemonsParams, Pokemon } from 'src/api/pokemons';

import { useBoolean } from './useBoolean';

interface UsePokemonsReturn {
  pokemons: Pokemon[];
  loading: boolean;
  error?: Error | undefined;
  counter: number;
  hasNext: boolean;
  hasPrevious: boolean;
  reload: () => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
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

  const [counter, setCounter] = useState(1);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, startLoading, stopLoading] = useBoolean(true);

  const loadPokemons = useCallback(
    async (params: GetPokemonsParams, addToCounter = 0) => {
      try {
        startLoading();

        const { pokemons, next, previous } = await getPokemons(params);

        setPokemons(pokemons);
        setListInfo({ next, previous });
        setCounter((prevCounter) => prevCounter + addToCounter);
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

  const reload = useCallback(async () => {
    loadPokemons({ limit, offset });
  }, [limit, offset, loadPokemons]);

  const nextPage = useCallback(() => {
    const { next } = listInfo;

    if (next) {
      loadPokemons({ superUrl: next }, 1);
    }
  }, [listInfo, loadPokemons]);

  const prevPage = useCallback(() => {
    const { previous } = listInfo;

    if (previous) {
      loadPokemons({ superUrl: previous }, -1);
    }
  }, [listInfo, loadPokemons]);

  return {
    pokemons,
    loading,
    error,
    counter,
    hasNext: Boolean(listInfo.next),
    hasPrevious: Boolean(listInfo.previous),
    reload,
    nextPage,
    prevPage,
  };
}
