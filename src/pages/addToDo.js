import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddToDo () {
  return (
    <View>
      <View style={styles.containertop}>
        <MaterialIcons style={styles.back} name='arrow-back' size={30} color='#293462'/>
        <View></View>
        <MaterialIcons style={styles.settings} name='settings' size={30} color='#293462'/>
      </View>
      <View style={styles.container}>
        <Text>Add To Do - Silahkan Mengubah Halaman Sesuai Figma</Text>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containertop: {
    paddingTop: 30,
    backgroundColor: "#fff",
    flexDirection:"row",
    justifyContent: "center",
  },
  back: {
    justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  settings: {
    alignItems: "flex-end",
  },
});