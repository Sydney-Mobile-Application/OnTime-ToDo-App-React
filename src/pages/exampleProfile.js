import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ProfileScreen ({ route }) {
  return (
    <View style={styles.container}>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});