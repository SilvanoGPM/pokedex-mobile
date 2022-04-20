import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
} from 'react-native';

import { Loading } from 'src/components/Loading';
import { Pokemon } from 'src/api/pokemons';
import { usePokemons } from 'src/hooks/usePokemons';
import { Error as ErrorComponent } from 'src/components/Error';
import { PokemonButton } from 'src/components/PokemonButton';
import { useBoolean } from 'src/hooks/useBoolean';

import styles from './styles';

export function Pokemons(): JSX.Element {
  const [refreshing, startRefresh, stopRefresh] = useBoolean(false);

  const {
    pokemons,
    loading,
    counter,
    hasNext,
    hasPrevious,
    reload,
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

  async function handleRefresh(): Promise<void> {
    startRefresh();

    await reload();

    stopRefresh();
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        data={pokemons}
        renderItem={({ item }) => <PokemonButton data={item} />}
        numColumns={2}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
