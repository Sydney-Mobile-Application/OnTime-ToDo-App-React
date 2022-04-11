import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddToDoCalendar from "./addToDoCalendar";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const actions = [
  {
    text: "Gallery",
    color: "#293462",
    icon: require("../../assets/images/gallery.png"),
    name: "bt_gallery",
    position: 1,
  },
  {
    text: "Camera",
    color: "#293462",
    icon: require("../../assets/images/camera.png"),
    name: "bt_camera",
    position: 2,
  },
  {
    text: "Location",
    color: "#293462",
    icon: require("../../assets/images/map.png"),
    name: "bt_location",
    position: 3,
  },
  {
    text: "URL",
    color: "#293462",
    icon: require("../../assets/images/url.png"),
    name: "bt_link",
    position: 4,
  },
];

export default function EditToDo({ navigation }) {
  const [textEmail, onChangeTextEmail] = useState("");
  const [oldDate, newDate] = useState("Select Date Time");
  const [oldTime, newTime] = useState("0:00");
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  function closeCalendarModal() {
    setModalCalendarVisible(false);
  }
  const [modalFontVisible, setModalFontVisible] = useState(false);
  function closeFontModal() {
    setModalFontVisible(false);
  }
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  // const callback = React.useCallback((date) => {
  //   newDate(date);
  // }, []);
  const receiveDate = (index) => {
    newDate(String(index));
    setShow(true);
  };

  const onChangeTime = (time) => {
    setShow(Platform.OS === "ios");
    let timenow = String(time.nativeEvent.timestamp);
    if (Number(Number(timenow.substring(16, 18)) - 6) < 0) {
      var hour = Number(timenow.substring(16, 18)) + 18;
    } else {
      var hour = Number(timenow.substring(16, 18)) - 6;
    }
    var minute = timenow.substring(19, 21);
    // receiveDate(String(time._i.hour) + " : " + String(time._i.minute));
    console.log(hour + ":" + minute);
    newTime(hour + ":" + minute);
    // const currentDate = selectedDate || time;
    // setShow(Platform.OS === 'ios');
    // setDate(currentDate);
    // console.log(date)
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.containertop}>
          <View style={styles.back}>
            <Pressable onPress={() => navigation.navigate("Dashboard")}>
              <MaterialIcons name="arrow-back" size={30} color="#293462" />
            </Pressable>
          </View>
          <View style={styles.settings}>
            <Text style={styles.dateInfo}>
              {oldDate} - {oldTime}
            </Text>
            <Pressable onPress={() => navigation.navigate("Dashboard")}>
              <Feather
                style={styles.saveButton}
                name="check"
                size={24}
                color="#293462"
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Dashboard")}>
              <AntDesign
                style={styles.saveButton}
                name="delete"
                size={24}
                color="#293462"
              />
            </Pressable>
            {/* <MaterialIcons  name='settings' size={30} color='#293462'/> */}
          </View>
        </View>
        <View style={styles.task}>
          <TextInput
            multiline={true}
            style={styles.title }
            onChangeText={onChangeTextEmail}
            placeholder="Meeting with project team "
          />
          <TextInput
            style={styles.description}
            onChangeText={onChangeTextEmail}
            multiline={true}
            placeholder="Discussing CRUD Function for OnTime App "
          />
        </View>

        <View style={styles.containerBottom}>
          <MaterialIcons
            onPress={() => setModalFontVisible(true)}
            name="font-download"
            size={25}
            color="#293462"
            style={styles.font}
          />
          <MaterialIcons
            onPress={() => setModalCalendarVisible(true)}
            name="calendar-today"
            size={25}
            color="#293462"
            style={styles.font}
          />
        </View>
        <FloatingAction
          actions={actions}
          color="#293462"
          showBackground={false}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalCalendarVisible}
          onRequestClose={() => {
            setModalCalendarVisible(!modalCalendarVisible);
          }}
        >
          <AddToDoCalendar
            receiveDate={receiveDate}
            closeCalendarModal={closeCalendarModal}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              format="HH:mm"
              value={date}
              mode="time"
              is24Hour={true}
              timeZoneOffsetInMinutes={60}
              display="default"
              onChange={onChangeTime}
            />
          )}
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalFontVisible}
          onRequestClose={() => {
            setModalFontVisible(!modalFontVisible);
          }}
        >
          <Pressable onPress={() => closeFontModal()}>
            <View style={styles.fontOption}>
              <MaterialIcons
                onPress={() => closeFontModal()}
                name="format-underline"
                size={30}
                color="#293462"
                style={styles.font}
              />
              <MaterialIcons
                onPress={() => closeFontModal()}
                name="format-bold"
                size={30}
                color="#293462"
                style={styles.font}
              />
              <MaterialIcons
                onPress={() => closeFontModal()}
                name="format-italic"
                size={30}
                color="#293462"
                style={styles.font}
              />
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  containerBottom: {
    // flex: 1,
    marginTop: windowHeight * 0.05,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    // height: windowHeight,
  },
  containertop: {
    width: windowWidth,
    marginTop: windowHeight * 0.02,
    paddingTop: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  back: {
    marginLeft: windowWidth * 0.08,
    marginTop: windowHeight * 0.01,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  settings: {
    textAlignVertical: "center",
    marginRight: windowWidth * 0.08,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  task: {
    alignSelf: "flex-start",
    marginTop: windowHeight * 0.05,
    marginBottom: windowWidth * 0.05,
    marginLeft: windowWidth * 0.12,
    marginRight: windowWidth * 0.08,
    height: windowHeight * 0.6,
    width: windowWidth * 0.8,
  },
  title: {
    padding: "5%",
    fontSize: 30,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginBottom: windowHeight * 0.02,
    fontFamily: "Poppins_600SemiBold",
  },
  description: {
    padding: "5%",
    // paddingTop: windowHeight * 0.01,
    textAlignVertical: "center",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginBottom: windowHeight * 0.02,
    // maxHeight: windowHeight*0.8,
  },

  font: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: windowWidth * 0.1,
  },
  saveButton: {
    marginLeft: windowWidth * 0.05,
    borderRadius: 50,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#293462",
    // backgroundColor: "#293462",
    // alignSelf:'flex-end',
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 5,
  },
  dateInfo: {
    marginBottom: windowHeight * 0.005,
    textAlignVertical: "center",
    fontFamily: "Poppins_400Regular",
  },
  fontOption: {
    flexDirection: "row",
    marginTop: windowHeight * 0.7,
    borderRadius: 15,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#fff",
    backgroundColor: "#ECECEC",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
