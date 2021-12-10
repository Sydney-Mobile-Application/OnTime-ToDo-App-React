import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function About () {
  return (
    <View style={styles.container}>
      <View>
        <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        <Text style={styles.aboutTitle}>About ToDoApp</Text>
      </View>
      <View style={styles.aboutDetail}>
      <Text style={styles.aboutDescription}>ToDoApp is an application designed to assist users in completing daily tasks on time {"\n"}{"\n"}</Text>
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
    paddingTop: 100
  },

  aboutTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 30,
    marginBottom: 25,
    marginLeft: 7
  },

  aboutDetail: {
    marginLeft: 7,
  },

  aboutDescription: {
    fontSize: 18,
  }
});