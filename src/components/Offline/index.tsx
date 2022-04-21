import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

export function Offline(): JSX.Element {
  return (
    <View style={styles.container}>
      <Icon name="wifi-off" size={80} color="#191919" />
      <Text style={styles.offlineText}>You are offline</Text>
    </View>
  );
}
