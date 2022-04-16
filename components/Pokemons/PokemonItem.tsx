import React from 'react';
import { View, Text } from 'react-native';
import { Pokemon } from '../../api/pokemons';

interface PokemonItemProps {
  data: Pokemon;
}

export function PokemonItem({ data }: PokemonItemProps): JSX.Element {
  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  );
}
