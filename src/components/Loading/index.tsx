import React from 'react';
import { ActivityIndicator } from 'react-native';

export function Loading(): JSX.Element {
  return <ActivityIndicator animating size="large" color="black" />;
}
