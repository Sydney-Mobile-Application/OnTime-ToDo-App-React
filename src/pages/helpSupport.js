import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function HelpSupport ({ navigation }) {
  let [fontsLoaded] = useFonts({
      Poppins_300Light,
      Poppins_400Regular,
      Poppins_600SemiBold,
      Poppins_700Bold,
      Poppins_800ExtraBold,
    })
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        </Pressable>
      <Text style={styles.helpSupportTitle}>Help & Support</Text>
    </View>

    <View style={styles.helpSupportDetail}>
        <View style={styles.helpSupportContainer}>
          <Text style={styles.description}>Email Us</Text>
          <Text style={styles.description}>todoappuib@gmail.com</Text>
       </View>
       <View style={styles.helpSupportContainer}>
          <Text style={styles.description}>Call Us</Text>
          <Text style={styles.description}>+12-345-678-900</Text>
       </View>
       <View style={styles.helpSupportContainer}>
          <Text style={styles.description}>WhatsApp Support</Text>
          <Text style={styles.description}>+12-345-678-900</Text>
       </View>
    </View>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 50
  },

  helpSupportTitle: {
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 25,
    marginLeft: 7,
    fontFamily: 'Poppins_600SemiBold'
  },

  helpSupportContainer: {
    width: '100%',
    height: '18%',
    borderRadius: 25,
    backgroundColor: '#FFECBF',
    paddingLeft: 20,
    paddingTop: 15,
    marginBottom: 20 
  },

  description:{
    lineHeight: 25,
    fontFamily: 'Poppins_400Regular'
  },
});