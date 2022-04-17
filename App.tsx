import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Roboto_400Regular as RobotoRegular,
  Roboto_700Bold as RobotoBold,
} from '@expo-google-fonts/roboto';

import { Loading } from 'src/components/Loading';
import { Home } from 'src/screens/Home';
import { RootStackParamList } from 'src/@types/routes.types';
import { ViewPokemon } from 'src/screens/ViewPokemon';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    RobotoRegular,
    RobotoBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigator initialRouteName="Home">
            <Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />

            <Screen
              name="ViewPokemon"
              component={ViewPokemon}
              options={{ headerShown: false }}
            />
          </Navigator>
        </SafeAreaView>

        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
