import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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

       <View style={styles.helpSupportContainer}>
          <Text style={styles.description}>Read our docs</Text>
          <Text style={styles.description}>

            *masukin pop up docs*
          </Text>
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
    paddingLeft: windowHeight * 0.04,
    paddingTop: 50
  },

  helpSupportTitle: {
    fontSize: 25,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 20,
    marginLeft: windowHeight * 0.01,
    fontFamily: 'Poppins_600SemiBold'
  },

  helpSupportContainer: {
    width: windowWidth *0.84 ,
    height: windowHeight * 0.1,
    borderRadius: 25,
    backgroundColor: '#FFECBF',
    paddingLeft: windowHeight * 0.03,
    paddingTop: windowWidth * 0.04,
    marginBottom: 20 
  },

  description:{
    lineHeight: 25,
    fontFamily: 'Poppins_400Regular'
  },
});