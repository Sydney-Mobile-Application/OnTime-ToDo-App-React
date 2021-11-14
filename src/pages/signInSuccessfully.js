import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SignInSuccess () {
  return (
    <View style={styles.container}>
      <Text>Sign In Successfully - Silahkan Mengubah Halaman Sesuai Figma</Text>
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