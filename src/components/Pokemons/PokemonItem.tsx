import React from 'react';
import { View, Text } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { getColorOfPokemonType } from 'src/utils/getColorOfPokemonType';
import { Pokemon } from 'src/api/pokemons';

import styles from './styles';

interface PokemonItemProps {
  data: Pokemon;
}

export function PokemonItem({ data }: PokemonItemProps): JSX.Element {
  const backgroundColor = getColorOfPokemonType(data.types[0]);

  return (
    <View style={[styles.pokemonItem, { backgroundColor }]}>
      <Text style={styles.pokemonItemText}>{data.name}</Text>
      <SvgUri width={100} height={100} uri={data.image} />
    </View>
  );
}
