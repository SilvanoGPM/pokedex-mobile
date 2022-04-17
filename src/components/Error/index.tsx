import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface ErrorProps {
  text?: string;
}

export function Error({
  text = 'Some error occurred!',
}: ErrorProps): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="closecircleo" size={40} color="#ee1515" />
      <Text
        style={{
          color: '#ee1515',
          fontSize: 25,
          fontFamily: 'RobotoBold',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
