import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ProfileScreen () {
  return (
    <View style={styles.container}>
      <Text>This Is Second Page</Text>
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