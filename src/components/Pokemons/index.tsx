import React from 'react';

import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Pokemon } from 'src/api/pokemons';
import { usePokemons } from 'src/hooks/usePokemons';

import { PokemonItem } from './PokemonItem';

export function Pokemons(): JSX.Element {
  const pokemons = usePokemons(5);

  function keyExtractor(item: Pokemon): string {
    return String(item.id);
  }

  return (
    <View>
      <FlatList
        keyExtractor={keyExtractor}
        data={pokemons.pokemons}
        renderItem={({ item }) => <PokemonItem data={item} />}
      />

      {pokemons.loading && <ActivityIndicator size="large" color="black" />}

      <TouchableOpacity onPress={pokemons.nextPage}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
