import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getColorOfPokemonType } from 'src/utils/getColorOfPokemonType';
import { Pokemon } from 'src/api/pokemons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/@types/routes.types';
import { titleString } from 'src/utils/titleString';

import styles from './styles';

interface PokemonButtonProps {
  data: Pokemon;
}

export function PokemonButton({ data }: PokemonButtonProps): JSX.Element {
  const backgroundColor = getColorOfPokemonType(data.types[0]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  function handleNavigation(): void {
    navigation.navigate('ViewPokemon', { id: data.id });
  }

  return (
    <View style={[styles.pokemonButton, { backgroundColor }]}>
      <TouchableOpacity onPress={handleNavigation}>
        <Text style={styles.pokemonButtonText}>{titleString(data.name)}</Text>
        <SvgUri width={100} height={100} uri={data.image} />
      </TouchableOpacity>
    </View>
  );
}
