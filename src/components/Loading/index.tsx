import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export function Loading(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating size="large" color="black" />
      <Text style={{ fontSize: 20, fontFamily: 'RobotoBold', marginTop: 20 }}>
        Loading...
      </Text>
    </View>
  );
}
