import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useFont,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font'

export default function SignIn ({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })
  const [text, onChangeText] = React.useState("Useless Text");
  const [textEmail, onChangeTextEmail] = useState("");
  const [textPassword, onChangeTextPassword] = useState("");
  const [signInDisable, setSignInDisable] = useState(true);

  useEffect(() => {
    if (!textEmail.trim() || !textPassword.trim()){
      setSignInDisable(true)
    } else {
      setSignInDisable(false)
    }
  }, [textEmail, textPassword])

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.textTopFSignIn}>Let's Sign You In!</Text>
        <Text style={styles.textTopSSignIn}>Welcome Back. You've Been Missed!</Text>
      </View>
      <TextInput style={styles.inputSignIn} onChangeText={onChangeTextEmail} placeholder="Email Or Username" />
      <TextInput style={styles.inputSignIn} onChangeText={onChangeTextPassword} secureTextEntry={true} placeholder="Password" />
      <View style={styles.inlineText}>
        <Text style={{fontFamily:'Poppins_400Regular',}}>Don't Have An Account Yet? </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{fontFamily:'Poppins_600SemiBold',}}>Register</Text>
        </Pressable>
      </View>
      <Pressable style={[styles.buttonSignIn, signInDisable ? {backgroundColor: 'rgba(108, 122, 137, 1)'} : '']} onPress={() => navigation.navigate('Dashboard')}  disabled={signInDisable}>
        <Text style={{fontFamily:'Poppins_600SemiBold',color: 'white', }}>Sign In</Text>
      </Pressable>
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
  headerContent: {
    width: '80%'
  },
  textTopFSignIn: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 30,
    alignSelf: 'flex-start'
  },
  textTopSSignIn: {
    fontSize: 25,
    fontFamily:'Poppins_300Light',
    marginBottom: 12
  },
  inputSignIn: {
    height: 50,
    width: '80%',
    fontFamily:'Poppins_400Regular',
    borderRadius: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: '#293462',
    padding: 10,
  },
  inlineText: {
    fontFamily:'Poppins_600SemiBold',
    flexDirection:'row',
    flexWrap:'wrap',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 225,
    marginBottom: 12
  },
  buttonSignIn: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '80%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  }
});