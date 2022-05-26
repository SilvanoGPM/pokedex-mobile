import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SvgProps, SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Popover from 'react-native-popover-view';

import { RootStackParamList } from 'src/@types/routes.types';
import { getColorOfPokemonType } from 'src/utils/getColorOfPokemonType';
import { titleString } from 'src/utils/titleString';
import { getColorOfStat } from 'src/utils/getColorOfStat';

import BugSvg from '../../assets/bug.svg';
import DarkSvg from '../../assets/dark.svg';
import DragonSvg from '../../assets/dragon.svg';
import ElectricSvg from '../../assets/electric.svg';
import FairySvg from '../../assets/fairy.svg';
import FightingSvg from '../../assets/fighting.svg';
import FireSvg from '../../assets/fire.svg';
import FlyingSvg from '../../assets/flying.svg';
import GhostSvg from '../../assets/ghost.svg';
import GrassSvg from '../../assets/grass.svg';
import GroundSvg from '../../assets/ground.svg';
import IceSvg from '../../assets/ice.svg';
import NormalSvg from '../../assets/normal.svg';
import PoisonSvg from '../../assets/poison.svg';
import PsychicSvg from '../../assets/psychic.svg';
import RockSvg from '../../assets/rock.svg';
import SteelSvg from '../../assets/steel.svg';
import WaterSvg from '../../assets/water.svg';

import styles from './styles';

const typesIcons = {
  bug: BugSvg,
  dark: DarkSvg,
  dragon: DragonSvg,
  electric: ElectricSvg,
  fairy: FairySvg,
  fighting: FightingSvg,
  fire: FireSvg,
  flying: FlyingSvg,
  ghost: GhostSvg,
  grass: GrassSvg,
  ground: GroundSvg,
  ice: IceSvg,
  normal: NormalSvg,
  poison: PoisonSvg,
  psychic: PsychicSvg,
  rock: RockSvg,
  steel: SteelSvg,
  water: WaterSvg,
};

type TypesIconsKeys = keyof typeof typesIcons;

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

          const TypeIcon = typesIcons[
            type as TypesIconsKeys
          ] as React.FC<SvgProps>;

          return (
            <Popover
              key={type}
              from={
                <TouchableOpacity
                  key={type}
                  style={[styles.typeContainer, { backgroundColor }]}
                >
                  <TypeIcon width={40} height={40} />
                </TouchableOpacity>
              }
            >
              <View style={styles.typePopover}>
                <Text style={styles.type}>{type}</Text>
              </View>
            </Popover>
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
