import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Dashboard () {
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.name}>Ohayou, James-kun</Text>
      </View>
      <Text>Dashboard - Silahkan Mengubah Halaman Sesuai Figma</Text>
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
  name:{
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start'
  },
});