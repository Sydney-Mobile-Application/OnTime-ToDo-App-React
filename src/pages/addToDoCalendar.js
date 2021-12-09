import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';

export default function TermAndCondition ({closeCalendarModal}) {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Text style={styles.textTitleSave}>Choose Date And Time.</Text>
        <Pressable style={styles.buttonSave} onPress={() => closeCalendarModal()}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save Date And Time</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: -40
  },
  textTitleSave: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  scrollViewSave: {
    maxHeight: 350,
    marginBottom: 10
  },
  buttonSave: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});