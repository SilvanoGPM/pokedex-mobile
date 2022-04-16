import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { Pokemon } from '../../api/pokemons';
import { usePokemons } from '../../hooks/usePokemons';
import { PokemonItem } from './PokemonItem';

export function Pokemons(): JSX.Element {
  const pokemons = usePokemons(5);

  function keyExtractor(item: Pokemon): string {
    return String(item.id);
  }

  if (pokemons.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={pokemons.pokemons}
      renderItem={({ item }) => <PokemonItem data={item} />}
    />
  );
}
