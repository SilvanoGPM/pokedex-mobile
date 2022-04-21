import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { Pokemons } from 'src/components/Pokemons';
import { Offline } from 'src/components/Offline';

import styles from './styles';

export function Home(): JSX.Element {
  const [isOffline, setIsOffline] = useState(true);

  useEffect(() => {
    async function fetchIsOffline(): Promise<void> {
      const { isConnected } = await NetInfo.fetch();

      setIsOffline(!isConnected);
    }

    fetchIsOffline();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ width: '80%' }}>
        <Image
          source={require('../../../assets/pokeball.png')}
          style={{ width: 35, height: 35, marginTop: 30 }}
        />
        <Text style={styles.title}>
          Poke<Text style={{ color: '#191919' }}>dex</Text>
        </Text>
      </View>

      <View
        style={{
          width: '90%',
          height: 1,
          backgroundColor: '#191919',
          marginVertical: 10,
        }}
      />

      {isOffline ? <Offline /> : <Pokemons />}
    </View>
  );
}
