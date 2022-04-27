import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';

import { RootStackParamList } from 'src/@types/routes.types';
import { getColorOfPokemonType } from 'src/utils/getColorOfPokemonType';
import { titleString } from 'src/utils/titleString';
import { getColorOfStat } from 'src/utils/getColorOfStat';

import styles from './styles';

type ViewPokemonProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPokemon'
>;

export function ViewPokemon({
  navigation,
  route,
}: ViewPokemonProps): JSX.Element {
  const { pokemon } = route.params;

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
            <View key={name} style={styles.statWrapper}>
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
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="caretleft" size={30} color="#191919" />
          </TouchableOpacity>
          <Text style={styles.pokemonName}>{titleString(pokemon.name)}</Text>
        </View>

        <View style={[styles.image, { backgroundColor }]}>
          <Text style={styles.pokemonId}>#0{pokemon.id}</Text>
          {!pokemon.image.endsWith('svg') ? (
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <SvgUri width={100} height={100} uri={pokemon.image} />
          )}
        </View>

        <View style={styles.info}>
          {getTypes()}
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
