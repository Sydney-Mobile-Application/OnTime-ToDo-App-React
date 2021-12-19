import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font'

export default function About ({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })
  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        </Pressable>
        <Text style={styles.aboutTitle}>About ToDoApp</Text>
      </View>
      <View style={styles.aboutDetail}>
      <Text style={styles.aboutDescription}>ToDoApp is an application designed to assist users in completing daily tasks on time {"\n"}</Text>
      <Text style={styles.aboutDescription}>Version 1.0 Alpha</Text>
      <Text style={styles.aboutDescription}>Build 1.0032468</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 50,
  },
  
  aboutTitle: {
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 25,
    marginLeft: 7,
    fontFamily: 'Poppins_600SemiBold'
  },
  
  aboutDetail: {
    marginLeft: 7,
  },
  
  aboutDescription: {
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular'
  }
});