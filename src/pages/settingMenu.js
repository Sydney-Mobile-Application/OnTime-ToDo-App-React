import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SettingMenu () {
  return (
    <View style={styles.container}>
      <Text>Setting Menu - Silahkan Mengubah Halaman Sesuai Figma</Text>
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