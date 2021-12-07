import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function LanguageSetting () {
  return (
    <View style={styles.container}>
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
    marginBottom: 20,
  },

  languageDescOn: {
    fontSize: 20,
    lineHeight: 40
  },

  languageDescOff: {
    fontSize: 20,
    lineHeight: 40,
    color: 'rgba(108, 122, 137, 1)',
  }
});