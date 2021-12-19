import React from 'react';
import { StyleSheet, View, Text, Pressable} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font'

export default function LanguageSetting ({ navigation }) {
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
    </View>
      <Text style={styles.languageTitle}>Language Setting</Text>
      <Text style={styles.languageDescOn}>English (US)</Text>
      <Text style={styles.languageDescOff}>English (UK)</Text>
      <Text style={styles.languageDescOff}>Bahasa Indonesia</Text>
      <Text style={styles.languageDescOff}>Deutsch</Text>
      <Text style={styles.languageDescOff}>Espanol</Text>
      <Text style={styles.languageDescOff}>Hindi</Text>
      <Text style={styles.languageDescOff}>Filipino</Text>
      <Text style={styles.languageDescOff}>Chinese Simplified (简体中文)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingTop: 50
  },

  languageTitle: {
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 20,
    marginLeft: 7,
    fontFamily: 'Poppins_600SemiBold'
  },

  languageDescOn: {
    fontSize: 20,
    lineHeight: 40,
    marginLeft: 7,
    fontFamily: 'Poppins_400Regular'
  },

  languageDescOff: {
    fontSize: 20,
    lineHeight: 40,
    marginLeft: 7,
    color: 'rgba(108, 122, 137, 1)',
    fontFamily: 'Poppins_400Regular'
  },

});