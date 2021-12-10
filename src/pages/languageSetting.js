import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LanguageSetting ({ navigation }) {
  return (
    <View style={styles.container}>
    <View>
      <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
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
    paddingTop: 100
  },

  languageTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 30,
    marginBottom: 20,
    marginLeft: 7
  },

  languageDescOn: {
    fontSize: 20,
    lineHeight: 40,
    marginLeft: 7
  },

  languageDescOff: {
    fontSize: 20,
    lineHeight: 40,
    marginLeft: 7,
    color: 'rgba(108, 122, 137, 1)',
  },

});