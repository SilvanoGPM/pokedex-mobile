import React, { useRef } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { Loading } from 'src/components/Loading';
import { Pokemon } from 'src/api/pokemons';
import { usePokemons } from 'src/hooks/usePokemons';
import { Error as ErrorComponent } from 'src/components/Error';
import { PokemonButton } from 'src/components/PokemonButton';

import styles from './styles';

export function Pokemons(): JSX.Element {
  const listRef = useRef<FlatList>(null);

  const {
    pokemons,
    loading,
    counter,
    hasNext,
    hasPrevious,
    nextPage,
    prevPage,
    error,
  } = usePokemons(50);

  function keyExtractor(item: Pokemon): string {
    return `${item.id} - ${item.name}`;
  }

  function renderFooter(): JSX.Element {
    return (
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[
              styles.footerButton,
              { opacity: hasPrevious || loading ? 1 : 0.5 },
            ]}
            disabled={!hasPrevious || loading}
            onPress={prevPage}
          >
            <Icon name="caretleft" size={30} color="#191919" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.footerButton,
              { opacity: hasNext || loading ? 1 : 0.5 },
            ]}
            disabled={!hasNext || loading}
            onPress={nextPage}
          >
            <Icon name="caretright" size={30} color="#191919" />
          </TouchableOpacity>
        </View>
        <Text style={styles.footerCounter}>{counter}</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (loading) {
    return <Loading text="Fetching..." />;
  }

  return (
    <View style={{ width: '100%', paddingHorizontal: 10 }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={pokemons}
        renderItem={({ item }) => <PokemonButton data={item} />}
        numColumns={2}
        ListFooterComponent={renderFooter}
        ref={listRef}
      />
    </View>
  );
}
