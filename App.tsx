import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import 'react-native-gesture-handler';

import {
  useFonts,
  Roboto_400Regular as RobotoRegular,
  Roboto_700Bold as RobotoBold,
} from '@expo-google-fonts/roboto';

import { Loading } from 'src/components/Loading';
import { RootStackParamList } from 'src/@types/routes.types';
import { ViewPokemon } from 'src/screens/ViewPokemon';

import { Drawer } from './Drawer';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    RobotoRegular,
    RobotoBold,
  });

  if (!fontsLoaded) {
    return <Loading text="Loading fonts..." />;
  }

  return (
    <ToastProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <Navigator initialRouteName="Home">
              <Screen
                name="Home"
                component={Drawer}
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
    </ToastProvider>
  );
}
