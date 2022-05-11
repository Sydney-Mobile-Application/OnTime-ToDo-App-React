import React from 'react';
import { StyleSheet, View,   Image, Text, Pressable, Dimensions, image } from 'react-native';
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

export default function LanguageSetting ({ navigation }) {
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
    </View>
      <Text style={styles.languageTitle}>Language Setting </Text>
      <Text style={styles.languageDescOff}>
      <Image style={styles.profilePicture} source={require("../../assets/englishflag.jpg")}/>
       English (UK)
      </Text>
      <Text style={styles.languageDescOff}>
      <Image style={styles.profilePicture} source={require("../../assets/indonesiaflag.png")} />
         Bahasa Indonesia
      </Text>
      <Text style={styles.languageDescOff}>
      <Image style={styles.profilePicture} source={require("../../assets/deutschflag.png")}/>
        Deutsch
      </Text>
      <Text style={styles.languageDescOff}>
      <Image style={styles.profilePicture} source={require("../../assets/espanolflag.png")}/>
        Espanol
      </Text>
      <Text style={styles.languageDescOff}>
      <Image style={styles.profilePicture} source={require("../../assets/hindiflag.png")}/>
        Hindi
      </Text>
      <Text style={styles.languageDescOff}>
      <Image style={styles.profilePicture} source={require("../../assets/filipinoflag.png")}/>
        Filipino
      </Text>
      <Text style={styles.languageDescOff}>
      <Image style={styles.profilePicture} source={require("../../assets/chineseflag.png")}/>
        Chinese Simplified (简体中文)
      </Text>

       
       
       

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

  languageTitle: {
    fontSize: 25,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 20,
    marginLeft: windowHeight * 0.01,
    fontFamily: 'Poppins_600SemiBold'
  },

  languageDescOn: {
    fontSize: 20,
    lineHeight: 40,
    marginLeft: windowHeight * 0.01,
    fontFamily: 'Poppins_400Regular'
  },
  profilePicture: {
    width: 30,
    height: 20,
    borderRadius: 50,
    position: "relative",
  },

  languageDescOff: {
    fontSize: 18,
    lineHeight: 40,
    marginLeft: windowHeight * 0.01,
    paddingHorizontal: 15,
    color: 'rgba(108, 122, 137, 1)',
    fontFamily: 'Poppins_400Regular',
    height: 35,
  },



});