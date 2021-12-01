import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';

export default function Register ({ navigation }) {
  const [text, onChangeText] = React.useState("Useless Text");

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.textTopFSignIn}>Let's Sign You In!</Text>
        <Text style={styles.textTopSSignIn}>Welcome Back. You've Been Missed!</Text>
      </View>
      <TextInput style={styles.inputSignIn} onChangeText={onChangeText} placeholder="Email Or Username" />
      <TextInput style={styles.inputSignIn} onChangeText={onChangeText} secureTextEntry={true} placeholder="Password" />
      <View style={styles.inlineText}>
        <Text>Don't Have An Account Yet? </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{fontWeight: 'bold'}}>Register</Text>
        </Pressable>
      </View>
      <Pressable style={styles.buttonSignIn} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Sign In</Text>
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
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start'
  },
  textTopSSignIn: {
    fontSize: 25,
    marginBottom: 12
  },
  inputSignIn: {
    height: 50,
    width: '80%',
    borderRadius: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: '#293462',
    padding: 10,
  },
  inlineText: {
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