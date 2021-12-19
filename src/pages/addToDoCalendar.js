import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
// import AddToDoTime from './addToDoTime';

export default function TermAndCondition ({closeCalendarModal}) {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        {/* <Text style={styles.textTitleSave}>Choose Date And Time.</Text> */}
        {/* <Calendar
          selectionMode="singleDay"
          scrollMode="oneMonth"
          monthsBefore={12}
          monthsAfter={24}
        /> */}
        <CalendarPicker
        todayBackgroundColor="rgba(41, 52, 98, 0.3)"
        todayTextStyle="#fff"
        selectedDayColor="#293462"
        selectedDayTextColor="#FFFFFF"
          // onDateChange={this.onDateChange}
        />
        
        <Pressable style={styles.buttonSave} onPress={() => closeCalendarModal()}>
          <Text style={{color: 'white', fontFamily:'Poppins_600SemiBold'}}>Save Date And Time</Text>
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
    backgroundColor: "#BFE4FF",
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
    marginTop: 50,
    backgroundColor: '#293462',
    color: '#293462',
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});