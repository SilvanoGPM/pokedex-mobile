import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useToast } from 'react-native-toast-notifications';

import { useBoolean } from 'src/hooks/useBoolean';
import { Pokemon, getPokemon } from 'src/api/pokemons';
import { PokemonButton } from 'src/components/PokemonButton';
import { Loading } from 'src/components/Loading';

import styles from './styles';

export function Search(): JSX.Element {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState({} as Pokemon);
  const [loading, startLoading, endLoading] = useBoolean(false);

  const toast = useToast();

  function resetPokemon(): void {
    setPokemon({} as Pokemon);
  }

  async function handleSearch(): Promise<void> {
    const formattedValue = search.trim().toLowerCase();
    const id = Number(formattedValue);

    if (!formattedValue || id <= 0) {
      toast.show('Insert a valid pokemon');
      return;
    }

    try {
      startLoading();

      const url = Number.isNaN(id)
        ? `https://pokeapi.co/api/v2/pokemon/${formattedValue}`
        : `https://pokeapi.co/api/v2/pokemon/${id}`;

      const pokemon = await getPokemon({ url });

      setPokemon(pokemon);
    } catch (err: any) {
      resetPokemon();

      toast.show('No pokemon found');
    } finally {
      endLoading();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <View style={styles.search}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          style={styles.searchInput}
          placeholder="Ex: Pikachu or 25"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="magnifying-glass" size={30} color="#191919" />
        </TouchableOpacity>
      </View>

      {loading && <Loading text="Searching..." />}

      {pokemon.id && (
        <View style={styles.pokemonFound}>
          <TouchableOpacity style={styles.resetPokemon} onPress={resetPokemon}>
            <Icon name="cross" color="#191919" size={30} />
          </TouchableOpacity>
          <PokemonButton data={pokemon} />
        </View>
      )}
    </View>
  );
}
