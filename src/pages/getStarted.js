import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { 
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic 
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font'

export default function GetStarted ({ navigation }) {

  let [fontsLoaded, error] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic 
  })
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.topTitleGetStarted}>
          Get To Your Task, Right
        </Text>
        <Text style={styles.topTitleGetStarted1}>
          OnTime
        </Text>
      </View>
      <Image
        style={styles.iconGetStarted}
        source={require('../../assets/getstart.png')}
      />
      <Text style={styles.titleGetStarted}>
        OnTime
      </Text>
      <Text style={styles.bottomTitleGetStarted}>
        Complete Your Task OnTime!
      </Text>
      <View style={styles.inlineButton}>
        <Pressable style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Register</Text>
        </Pressable>
        <Pressable style={styles.buttonSignIn} onPress={() => navigation.navigate('Sign In')}>
          <Text style={{fontWeight: 'bold'}}>Sign In</Text>
        </Pressable>
      </View>
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
  iconGetStarted : {
    width: 250,
    height: 250,
  },
  headerContainer: {
    width: '60%'
  },
  topTitleGetStarted: {
    color: '#082032',
    fontSize: 20,
    fontFamily:'Poppins_700Bold',
    left: 0,
    alignSelf: 'flex-start'
  },
  topTitleGetStarted1: {
    color: '#082032',
    fontSize: 25,
    fontFamily:'Poppins_700Bold',
    left: 0,
    alignSelf: 'flex-start'
  },
  titleGetStarted: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  bottomTitleGetStarted: {
    paddingBottom: 10 
  },
  inlineButton: {
    flexDirection:'row',
    flexWrap:'wrap',
    width: '60%',
    backgroundColor: '#E8E8E8',
    borderRadius: 26
  },
  buttonRegister: {
    backgroundColor: '#293462',
    color: 'white',
    width: '50%',
    height: 50,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSignIn: {
    backgroundColor: '#E8E8E8',
    color: '#E8E8E8',
    width: '50%',
    height: 50,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  }
});