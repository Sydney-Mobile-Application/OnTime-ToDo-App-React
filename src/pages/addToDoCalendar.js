import React from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CalendarPicker from "react-native-calendar-picker";
import { DefaultTheme } from "react-native-paper";
// import AddToDoTime from './addToDoTime';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function TermAndCondition({ closeCalendarModal, receiveDate }) {
  const onDateChange = (date) => {
    switch (date._i.month + 1) {
      case 1:
        var month = "January";
        break;
      case 2:
        var month = "February";
        break;
      case 3:
        var month = "March";
        break;
      case 4:
        var month = "April";
        break;
      case 5:
        var month = "May";
        break;
      case 6:
        var month = "June";
        break;
      case 7:
        var month = "July";
        break;
      case 8:
        var month = "August";
        break;
      case 9:
        var month = "September";
        break;
      case 10:
        var month = "October";
        break;
      case 11:
        var month = "November";
        break;
      case 12:
        var month = "December";
        break;
    }
    receiveDate(
      String(date._i.day) + " " + String(month) + " " + String(date._i.year),
      date
    );
    console.log(date);
  };
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
          minDate={new Date()}
          todayBackgroundColor="rgba(226, 238, 247, 1)"
          todayTextStyle="#fff"
          selectedDayColor="#293462"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
          // onDateChange={this.onDateChange}
        />

        <Pressable
          style={styles.buttonSave}
          onPress={() => closeCalendarModal()}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Save Date And Time
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "#BFE4FF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: -40,
  },
  textTitleSave: {
    fontWeight: "bold",
    fontSize: RFPercentage(2),
    marginBottom: 10,
  },
  scrollViewSave: {
    maxHeight: 350,
    marginBottom: 10,
  },
  buttonSave: {
    marginTop: 50,
    backgroundColor: "#293462",
    color: "#293462",
    width: "100%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
