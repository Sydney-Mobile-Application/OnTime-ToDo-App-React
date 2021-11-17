import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

export default function GetStarted ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.topTitleGetStarted}>
        Get To Your Task, Right OnTime
      </Text>
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
  topTitleGetStarted: {
    fontWeight: 'bold',
    left: 0
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
    width: '80%',
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