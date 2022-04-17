import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';

import { RootDrawerParamList } from 'src/@types/routes.types';
import { Home } from 'src/screens/Home';
import { Search } from 'src/screens/Search';

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();

function IconCompass(props: { color: string; size: number }): JSX.Element {
  return <Icon name="compass" {...props} />;
}

function IconSearch(props: { color: string; size: number }): JSX.Element {
  return <Icon name="magnifying-glass" {...props} />;
}

export function Drawer(): JSX.Element {
  return (
    <Navigator initialRouteName="Explore">
      <Screen
        name="Explore"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: IconCompass,
        }}
      />

      <Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          drawerIcon: IconSearch,
        }}
      />
    </Navigator>
  );
}
