import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SvgUri } from 'react-native-svg';

import { RootStackParamList } from 'src/@types/routes.types';
import { usePokemon } from 'src/hooks/usePokemon';
import { Loading } from 'src/components/Loading';
import { getColorOfPokemonType } from 'src/utils/getColorOfPokemonType';
import { titleString } from 'src/utils/titleString';
import { getColorOfStat } from 'src/utils/getColorOfStat';

import styles from './styles';

type ViewPokemonProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPokemon'
>;

export function ViewPokemon({ route }: ViewPokemonProps): JSX.Element {
  const { pokemon, loading } = usePokemon(route.params.id);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }

  function getTypes(): JSX.Element {
    return (
      <View style={styles.types}>
        {pokemon.types.map((type) => {
          const backgroundColor = getColorOfPokemonType(type);

          return (
            <Text key={type} style={[styles.type, { backgroundColor }]}>
              {type}
            </Text>
          );
        })}
      </View>
    );
  }

  function getStats(): JSX.Element {
    return (
      <View style={styles.stats}>
        {pokemon.stats.map(({ name, value }) => {
          const backgroundColor = getColorOfStat(name);

          return (
            <View style={styles.statWrapper}>
              <Text style={[styles.stat, { backgroundColor }]}>
                {titleString(name)}:
              </Text>
              <Text style={styles.infoText}>{value}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  const backgroundColor = getColorOfPokemonType(pokemon.types[0]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={[styles.image, { backgroundColor }]}>
          <Text style={styles.pokemonId}>#0{pokemon.id}</Text>
          <SvgUri width={200} height={200} uri={pokemon.image} />
        </View>

        <View style={styles.info}>
          {getTypes()}
          <Text style={styles.pokemonName}>{titleString(pokemon.name)}</Text>
          <Text style={styles.infoText}>Weight: {pokemon.weight}</Text>
          <Text style={styles.infoText}>Height: {pokemon.height}</Text>
          <Text style={styles.infoText}>
            Abilities: {pokemon.abilities.join(', ')}
          </Text>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#191919',
              marginVertical: 10,
            }}
          />

          {getStats()}
        </View>
      </View>
    </ScrollView>
  );
}
