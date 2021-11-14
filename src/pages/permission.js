import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Permission () {
  return (
    <View style={styles.container}>
      <Text>Permission - Silahkan Mengubah Halaman Sesuai Figma</Text>
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