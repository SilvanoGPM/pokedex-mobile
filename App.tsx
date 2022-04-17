import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Pokemons } from './src/components/Pokemons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Pokemons />
      <StatusBar style="auto" />
    </View>
  );
}
