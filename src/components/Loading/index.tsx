import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingProps {
  text?: string;
}

export function Loading({ text = 'Loading...' }: LoadingProps): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating size="large" color="black" />
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
