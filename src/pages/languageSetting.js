import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function LanguageSetting () {
  return (
    <View style={styles.container}>
      <Text>Language Setting - Silahkan Mengubah Halaman Sesuai Figma</Text>
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