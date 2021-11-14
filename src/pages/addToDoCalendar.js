import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function AddToDoCalendar () {
  return (
    <View style={styles.container}>
      <Text>Add To Do Calendar - Silahkan Mengubah Halaman Sesuai Figma</Text>
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