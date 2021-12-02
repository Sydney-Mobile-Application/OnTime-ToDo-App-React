import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function AddToDo () {
  const [textEmail, onChangeTextEmail] = useState("");
  return (
    <View>
      <View style={styles.containertop}>
        <View style={styles.back} >
          <MaterialIcons name='arrow-back' size={30} color='#293462'/>
        </View>
        <View style={styles.settings} >
          <MaterialIcons  name='settings' size={30} color='#293462'/>
        </View>
      </View>
      <View style={styles.container}>
        <TextInput onChangeText={onChangeTextEmail} placeholder="Title" />
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
    width: windowWidth,
    paddingTop: 30,
    backgroundColor: "#fff",
    flexDirection:"row",
    alignSelf: "center",
  },
  back: {
    marginLeft: windowWidth*0.08,
    marginTop: windowHeight*0.02,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  settings: {
    marginLeft: windowWidth*0.70,
    alignItems: 'flex-end',
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
});