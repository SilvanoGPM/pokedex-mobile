import React, { useRef } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { Loading } from 'src/components/Loading';
import { Pokemon } from 'src/api/pokemons';
import { usePokemons } from 'src/hooks/usePokemons';

import { PokemonItem } from './PokemonItem';
import styles from './styles';

export function Pokemons(): JSX.Element {
  const listRef = useRef<FlatList>(null);
  const pokemons = usePokemons(50);

  function keyExtractor(item: Pokemon): string {
    return `${item.id} - ${item.name}`;
  }

  function backToTop(): void {
    listRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }

  function handlePrevious(): void {
    backToTop();
    pokemons.prevPage();
  }

  function handleNext(): void {
    backToTop();
    pokemons.nextPage();
  }

  function renderFooter(): JSX.Element {
    return (
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[
              styles.footerButton,
              { opacity: pokemons.hasPrevious || pokemons.loading ? 1 : 0.5 },
            ]}
            disabled={!pokemons.hasPrevious || pokemons.loading}
            onPress={handlePrevious}
          >
            <Icon name="caretleft" size={30} color="#191919" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.footerButton,
              { opacity: pokemons.hasNext || pokemons.loading ? 1 : 0.5 },
            ]}
            disabled={!pokemons.hasNext || pokemons.loading}
            onPress={handleNext}
          >
            <Icon name="caretright" size={30} color="#191919" />
          </TouchableOpacity>
        </View>
        <Text style={styles.footerCounter}>{pokemons.counter}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={pokemons.pokemons}
        renderItem={({ item }) => <PokemonItem data={item} />}
        numColumns={2}
        ListFooterComponent={renderFooter}
        ref={listRef}
      />

      {pokemons.loading && <Loading />}
    </View>
  );
}
