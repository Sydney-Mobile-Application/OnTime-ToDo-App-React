import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  Modal,
  Alert,
  TouchableOpacity,
  IconButton,
  Image,
  ScrollView,
} from "react-native";
import Prompt from "react-native-input-prompt";
import Lightbox from 'react-native-lightbox';
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddToDoCalendar from "./addToDoCalendar";
import TheImagePicker from "./TheImagePicker";
import TheLocationPicker from "./TheLocationPicker";

import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker

// Firebase
import {
  doc,
  getDoc,
  setDoc,
  add,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";


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

export default function AddToDo({ navigation }) {
  const [textTitle, onChangeTextTitle] = useState("");
  const [textDesc, onChangeTextDesc] = useState("");
  const [oldDate, newDate] = useState("Select Date Time");
  const [oldTime, newTime] = useState("0:00");
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [priority, setPriority] = useState(false);

  // setTaskImage = (image) => {
  //   props.setFieldValue('imageUri', image.uri);
  // }
  
  const priorityTask = () => {
    setPriority(!priority);
  };
  

  // this.state ={
  //   toggle: false,
  // }

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

  const [state, setState] = useState({
    userData: [],
    dateTime: null,
  });

  const clearData = () => {
    newDate("Select Date Time");
    newTime("0:00");
    setModalCalendarVisible(false);
    onChangeTextDesc("");
    onChangeTextTitle("");
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
    // console.log(hour + ":" + minute);
    newTime(hour + ":" + minute);
    setState((prevState) => ({
      ...prevState,
      dateTime: time.nativeEvent.timestamp.toString(),
    }));
    // const currentDate = selectedDate || time;
    // setShow(Platform.OS === 'ios');
    // setDate(currentDate);
    // console.log(date)
  };

  const onSaveData = () => {
    if (state.userData.length != 0) {
      if (state.dateTime === null) {
        Alert.alert("Error", "Date Time Cannot Empty !");
      } else if (textTitle === "" || textDesc === "") {
        Alert.alert("Error", "Title and Description Cannot Empty !");
      } else {
        const myDoc = doc(collection(db, "notes"));

        const dataPost = {
          date: Timestamp.fromDate(new Date(state.dateTime)),
          title: textTitle,
          description: textDesc,
          is_favourite: false,
          priority: priority,
          type: "Upcoming",
          done: false,
          userId: state.userData.uid,
        };

        setDoc(myDoc, dataPost)
          .then(() => {
            clearData();
            Alert.alert("Success", "Task Submitted Successfully !");
            navigation.navigate("Dashboard");
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
      }
    }
  };

  const [image, setImage] = useState(null);
  const [link, setLink] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    console.log("Height:" + result.height);
    console.log(result);
    


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeCamImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);



    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const deleteImage = async () => {
    let result = null
    setImage(result)
  };

  const takeLink = async () => {
    
      Alert.prompt("Url", "Insert your link here", );
    
    let result = null
    // setImage(result)
  };

  useEffect(() => {
    clearData();
    getSavedUserData();
  }, []);

  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        setState((prevState) => ({
          ...prevState,
          userData: JSON.parse(userData),
        }));
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
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
            {/* <Pressable onPress={() => navigation.navigate("Dashboard")}> */}
            <Pressable onPress={() => onSaveData()}>
              <Feather
                style={styles.saveButton}
                name="check"
                size={24}
                color="#293462"
              />
            </Pressable>
            {/* <MaterialIcons  name='settings' size={30} color='#293462'/> */}
          </View>
        </View>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.task}>
        
          <TextInput
            style={styles.title}
            padding={"5%"}
            multiline={true}
            onChangeText={onChangeTextTitle}
            placeholder="Title "
          />
          <Prompt
              visible={true}
              title="Say Something"
              placeholder="Type Something"
              onCancel={() =>
                  console.log("Cancelled")
              }
              onSubmit={text =>
                console.log("Submit")
              }
            />
          {/* <TheLocationPicker/> */}
          {/* <TheImagePicker /> */}
          <TextInput
            style={styles.description}
            padding={"5%"}
            onChangeText={onChangeTextDesc}
            multiline={true}
            placeholder="Description"
          />
          {image && 
          <>
          <View style={styles.containerBottom}>
            <View style={{width: "40%"}}>
              <Text>Image: </Text>
              <Text onPress={takeCamImage} style={{marginTop: "10%"}}>Camera</Text>
              <Text onPress={pickImage} style={{marginTop: "5%"}}>Change</Text>
              <Text onPress={deleteImage} style={{marginTop: "5%"}}>Delete</Text>
            </View>
            <Lightbox style={{maxWidth: "50%", height: 300, flex: 1 }}>
              <Image source={{ uri: image }} resizeMethod="resize" resizeMode="contain" style={{width: "100%" , height: "100%", alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "column" }} />
            </Lightbox>
          </View>
          </>
          }

          
        </ScrollView>

          <View style={styles.containerBottom}>
{/* -------------------------------------------------------------------------------------- */}
          
          
          {/* <Pressable
          style={({pressed}) =>[{color: pressed? '#EC9B3B' : 'grey'},styles.star]}>
          {({pressed}) => (
            <MaterialIcons style={{color: pressed ? '#EC9B3B' : 'grey'}}
            name="star"
            size={25}
            color="#293462"
            />
          )}
          </Pressable> */}
{/* haven't fixed */}
          {/* <Pressable onPress={() => setSelected(!selected)}
            style={{backgroundColor: selected ? '#EC9B3B' : 'rgba(0,0,0,0.12)',
            marginLeft: windowWidth * 0.1,
            height: 25,}}>
            <MaterialIcons 
            name="star"
            color='rgba(0,0,0,0.12)'
            size={25}
            />
          </Pressable> */}
{/* -------------------------------------------------------------------------------------- */}
          <MaterialIcons
            onPress={() => setModalCalendarVisible(true)}
            name="calendar-today"
            size={25}
            color="#293462"
            style={styles.font}
          />
          <Pressable onPress={()=>priorityTask()}>
            <MaterialIcons
              name='star'
              size={30}
              color={priority ? '#EC9B3B' : 'grey'}
              style={styles.priorityStar}
              value={priority? 0 : 1}
            />
          </Pressable>
        </View>
        <FloatingAction
          actions={actions}
          color="#293462"
          showBackground={false}
          onPressItem={(name) => {
            if(name === "bt_gallery"){
              pickImage()
            }else if (name === "bt_camera") {
              takeCamImage()
            }else if (name === "bt_link") {
              
            }
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
    flex: 1,
    // marginTop: windowHeight * 0.05,
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
    // marginBottom: windowWidth * 0.05,
    marginLeft: windowWidth * 0.12,
    marginRight: windowWidth * 0.08,
    height: windowHeight * 0.6,
    width: windowWidth * 0.8,
    // backgroundColor:'#000'
  },
  title: {
    fontSize: 30,
    // padding: "5%",
    minWidth: "100%",
    textAlignVertical: "top",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginBottom: windowHeight * 0.02,
    fontFamily: "Poppins_600SemiBold",
  },
  description: {
    // padding: "5%",
    minWidth: "100%",
    // height: "100%",
    marginBottom: "10%",
    textAlignVertical: "top",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // maxHeight: windowHeight*0.8,
  },

  font: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: windowWidth * 0.1,
    // backgroundColor: '#000'
  },

  priorityStar: {
    alignSelf: "flex-start",
    marginTop: "-5%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: windowWidth * 0.1,
    // backgroundColor: '#000'
  },

  star: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: windowWidth * 0.1,
    color: '#EE6F57',
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
