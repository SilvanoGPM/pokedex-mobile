import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
  useFonts,
  Roboto_400Regular as RobotoRegular,
  Roboto_700Bold as RobotoBold,
} from '@expo-google-fonts/roboto';

import { Pokemons } from './src/components/Pokemons';
import { Loading } from './src/components/Loading';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    RobotoRegular,
    RobotoBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Pokemons />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
