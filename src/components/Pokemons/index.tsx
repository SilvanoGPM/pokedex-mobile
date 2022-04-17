import React from 'react';
import { FlatList, View } from 'react-native';

import { Loading } from 'src/components/Loading';
import { Pokemon } from 'src/api/pokemons';
import { usePokemons } from 'src/hooks/usePokemons';

import { PokemonItem } from './PokemonItem';

export function Pokemons(): JSX.Element {
  const pokemons = usePokemons(20);

  function keyExtractor(item: Pokemon): string {
    return `${item.id} - ${item.name}`;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={pokemons.pokemons}
        renderItem={({ item }) => <PokemonItem data={item} />}
        numColumns={2}
        onEndReachedThreshold={0.2}
        onEndReached={pokemons.nextPage}
      />

      {pokemons.loading && <Loading />}
    </View>
  );
}
