import React, { useState, useEffect, Component, useCallback } from "react";
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
  Button,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddToDoCalendar from "./addToDoCalendar";
import Prompt from "react-native-input-prompt";
import Lightbox from "react-native-lightbox";
import * as ImagePicker from "expo-image-picker"; // not react-image-picker
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import moment from "moment";
import uuid from "react-native-uuid";

// Firebase
import {
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getApps, initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzfGyrTOPd4_S0MRyFbpiMVWKRlOpRl60",
  authDomain: "todoapp-813f2.firebaseapp.com",
  databaseURL:
    "https://todoapp-813f2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todoapp-813f2",
  storageBucket: "todoapp-813f2.appspot.com",
  messagingSenderId: "532708203730",
  appId: "1:532708203730:web:bb80d5bec14d58c741610b",
  measurementId: "G-Y054Z4FKQ1",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

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
  // {
  //   text: "Location",
  //   color: "#293462",
  //   icon: require("../../assets/images/map.png"),
  //   name: "bt_location",
  //   position: 3,
  // },
  {
    text: "URL",
    color: "#293462",
    icon: require("../../assets/images/url.png"),
    name: "bt_link",
    position: 3,
  },
];

export default function EditToDo({ navigation, route }) {
  const [textTitle, onChangeTextTitle] = useState(""); //pre-filled*
  const [textDesc, onChangeTextDesc] = useState(""); //pre-filled*
  const [oldDate, newDate] = useState("Select Date Time");
  const [oldTime, newTime] = useState("0:00");
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [textLink, onChangeLink] = useState(""); //pre-filled*
  const [priority, setPriority] = useState(false); //pre-filled*
  const [image, setImage] = useState(null); //pre-filled*
  const [linkURL, setURL] = useState(null); //pre-filled*
  const [link, setLink] = useState(false); //pre-filled*
  const [imageURI, dataImage] = useState(""); //pre-filled*

  const priorityTask = () => {
    setPriority(!priority);
  };
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

  const [heightDesc, setHeightDesc] = useState({
    height: 100, //initializing the content text height
  });
  const [heightTitle, setHeightTitle] = useState({
    height: 100, //initializing the content text height
  });

  const [state, setState] = useState({
    selectedData: [],
    noteId: null,
    updatedDate: null,
    downloadImageUrl: null,
  });

  const getSelectedNotes = async (noteId) => {
    const docRef = doc(db, "notes", noteId);
    const docSnap = await getDoc(docRef);

    if (docSnap) {
      setState((prevState) => ({
        ...prevState,
        userData: docSnap.data(),
        noteId: noteId,
      }));
    } else {
      console.log("no data found");
    }
  };

  const getImageUrl = async (value) => {
    const fileRef = ref(getStorage(), value);
    await getDownloadURL(fileRef).then((downloadURL) => {
      setImage(downloadURL);
    });
  };

  const generateUniqueId = () => {
    let uniqueId = uuid.v4();

    if (uniqueId) {
      setState((prevState) => ({
        ...prevState,
        downloadImageUrl: uniqueId,
      }));
    }
  };

  

  useEffect(() => {
    getSelectedNotes(route.params.noteId);
    generateUniqueId();
  }, [route.params?.noteId]);

  useEffect(() => {
    onChangeTextTitle(state.userData?.title);
    onChangeTextDesc(state.userData?.description);
    setURL(state.userData?.url);
    setPriority(state.userData?.priority);
    newDate(
      moment(new Date(state.userData?.date?.seconds * 1000))
        .format("DD MMM YYYY")
        .toString()
    );
    newTime(
      moment(new Date(state.userData?.date?.seconds * 1000))
        .format("hh:mm")
        .toString()
    );
    getImageUrl(state.userData?.imageURL);
  }, [state.userData]);

  const onChangeTime = (time) => {
    setShow(Platform.OS === "ios");
    let timenow = String(time.nativeEvent.timestamp);

    setState((prevState) => ({
      ...prevState,
      updatedDate: timenow,
    }));

    if (timenow === "undefined") {
      console.log("date time invalid");
    } else {
      if (Number(Number(timenow.substring(16, 18)) - 6) < 0) {
        var hour = Number(timenow.substring(16, 18)) + 18;
      } else {
        var hour = Number(timenow.substring(16, 18)) - 6;
      }
      var minute = timenow.substring(19, 21);

      newTime(hour + ":" + minute);
    }
  };

  const uploadImage = async (imageURI) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageURI, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), state.downloadImageUrl);

    const uploadTask = uploadBytesResumable(fileRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("uploadBytes Err : ", error);
      },
      () => {
        blob.close();

        return true;
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // });
      }
    );

    // const ref = storageRef;
    // console.log(fileRef);
    // const snapshot = await ref.put(blob);

    // getDownloadURL(fileRef)
    //   .then((url) => {
    //     console.log("getDownloadURL", url);
    //     return url;
    //   })
    //   .catch((error) => {
    //     console.log("error get downloadurl", error);
    //   });
  };


  const onDoneData = () => {
    const myDoc = doc(db, "notes", state.noteId);

    const dataPost = {
      done: true,
      priority: false,
    };

    updateDoc(myDoc, dataPost)
      .then(() => {
        Alert.alert("Success", "Task mark as Done !");
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const onUpdateData = async () => {
    const myDoc = doc(db, "notes", state.noteId);

    let dataPost = {};

    if (state.updatedDate) {
      if (imageURI) {
        await uploadImage(imageURI);
        dataPost = {
          date: Timestamp.fromDate(new Date(state.updatedDate)),
          title: textTitle,
          description: textDesc,
          priority: priority,
          url: linkURL,
          imageURL: state.downloadImageUrl,
        };
      } else if (!image){
        dataPost = {
          date: Timestamp.fromDate(new Date(state.updatedDate)),
          title: textTitle,
          description: textDesc,
          priority: priority,
          url: linkURL,
          imageURL: null
        };
      } 
      else {
        dataPost = {
          date: Timestamp.fromDate(new Date(state.updatedDate)),
          title: textTitle,
          description: textDesc,
          priority: priority,
          url: linkURL,
        };
        
      }
    } else {
      if (imageURI) {
        console.log("imageURI: ",imageURI)
        await uploadImage(imageURI);
        dataPost = {
          title: textTitle,
          description: textDesc,
          priority: priority,
          url: linkURL,
          imageURL: state.downloadImageUrl,
        };
      } else if (!image) {
        console.log("image: ",image)
        dataPost = {
          title: textTitle,
          description: textDesc,
          priority: priority,
          url: linkURL,
          imageURL: null,
        }
      }
      else {
        dataPost = {
          title: textTitle,
          description: textDesc,
          priority: priority,
          url: linkURL,
          imageURL: state.downloadImageUrl,
        };
      }
    }

    updateDoc(myDoc, dataPost)
      .then(() => {
        Alert.alert("Success", "Task Updated !");
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const onDeleteData = async () => {
    const deleteData = deleteDoc(doc(db, "notes", state.noteId));

    if (deleteData) {
      Alert.alert("Success", "Task deleted !");
      navigation.navigate("Dashboard");
    }
  };

  const markAsDone = async () => {
    Alert.alert(
      "Mark this task as done?",
      "You can see this task on Done Task",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            onDoneData();
          },
        }, //function onDoneData
      ]
    );
  };

  const deleteTask = async () => {
    Alert.alert("Delete this task?", "This task will be deleted", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          onDeleteData();
        },
      },
    ]);
  };

  const editTask = async () => {
    Alert.alert("Save this changes?", "This task will be updated", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Discard",
        onPress: () => navigation.navigate("Dashboard"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          onUpdateData();
        },
      },
    ]);
  };

  const linkTask = () => {
    setLink(!link);
  };
  const takeLink = (textLink) => {
    onChangeLink(textLink);
    setURL(textLink);
    setLink(!link);
  };
  const deleteLink = () => {
    let noLink = null;
    onChangeLink(noLink);
    setURL(noLink);
  };

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
      dataImage(result.uri);
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
      dataImage(result.uri);
    }
  };

  const deleteImage = async () => {
    let result = null;
    setImage(result);
    dataImage(result);
  };

  const OpenURLButton = ({ url, linkURL }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Couldn't find URL: ${url}`);
      }
    }, [url]);
    return (
      <Text
        style={{ marginLeft: "2%", marginBottom: "3%", color: "#007AFF" }}
        onPress={handlePress}
      >
        {" "}
        Go To URL{" "}
      </Text>
    );
    {
      /* <Button title={"Go to URL"} onPress={handlePress}/> */
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.containertop}>
          <View style={styles.back}>
            <Pressable onPress={editTask}>
              <MaterialIcons name="arrow-back" size={30} color="#293462" />
            </Pressable>
          </View>
          <View style={styles.settings}>
            <Pressable onPress={editTask}>
              <Feather
                style={styles.saveButton}
                name="check"
                size={24}
                color="#293462"
              />
            </Pressable>
            <Pressable onPress={deleteTask}>
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
        <View
          style={[
            { alignSelf: "flex-end", marginRight: "10%", marginTop: "5%" },
          ]}
        >
          <Text style={styles.dateInfo}>
            {oldDate} - {oldTime}
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.task}
        >
          <TextInput
            style={[styles.title, { height: Math.max(44, heightTitle.height) }]}
            padding={"5%"}
            multiline={true}
            onChangeText={onChangeTextTitle}
            value={textTitle}
            placeholder="Title"
            onContentSizeChange={(event) => {
              setHeightTitle({ height: event.nativeEvent.contentSize.height });
            }}
          />
          <Prompt
            visible={link ? true : false}
            title="Enter your URL"
            placeholder="Type Something"
            onCancel={
              () => setLink(!link)
              // console.log("Cancelled")
            }
            onSubmit={
              (textLink) => takeLink(textLink)

              // console.log("Submit")
            }
          />
          {/* <TheLocationPicker/> */}
          {/* <TheImagePicker /> */}
          <TextInput
            style={[
              styles.description,
              { height: Math.max(44, heightDesc.height) },
            ]}
            padding={"5%"}
            value={textDesc}
            onChangeText={onChangeTextDesc}
            multiline={true}
            placeholder="Description"
            onContentSizeChange={(event) => {
              setHeightDesc({ height: event.nativeEvent.contentSize.height });
            }}
          />
          <View>
            {image && (
              <>
                <Text
                  style={{ fontFamily: "Poppins_600SemiBold", padding: "3%" }}
                >
                  Image{" "}
                </Text>
                <View style={styles.containerBottom}>
                  <Lightbox style={{ Width: "50%", height: 150, flex: 1 }}>
                    <Image
                      source={{ uri: image }}
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    />
                  </Lightbox>
                  <View style={{ width: "40%" }}>
                    <Text
                      onPress={takeCamImage}
                      style={{
                        marginTop: "10%",
                        fontFamily: "Poppins_400Regular",
                        padding: "3%",
                      }}
                    >
                      Camera
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Pressable onPress={pickImage}>
                        <MaterialIcons
                          name="edit"
                          size={20}
                          color="#293462"
                          style={styles.editButton}
                        />
                      </Pressable>
                      <Text onPress={pickImage} style={styles.imageButton}>
                        Change
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Pressable onPress={deleteImage}>
                        <MaterialIcons
                          name="delete"
                          size={20}
                          color="#293462"
                          style={styles.deleteButton}
                        />
                      </Pressable>
                      <Text onPress={deleteImage} style={styles.imageButton}>
                        Delete
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
            {linkURL && (
              <>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      marginTop: "10%",
                      marginBottom: "3%",
                      paddingLeft: "3%",
                    }}
                  >
                    Link
                  </Text>
                  <OpenURLButton url={linkURL}>{linkURL}</OpenURLButton>
                  <Text
                    style={{
                      paddingLeft: "3%",
                      textDecorationLine: "underline",
                    }}
                  >
                    {linkURL}
                  </Text>
                  <View style={styles.containerBottom}>
                    <View style={{ flexDirection: "row" }}>
                      <Pressable onPress={linkTask}>
                        <MaterialIcons
                          name="edit"
                          size={20}
                          color="#293462"
                          style={styles.editButton}
                        />
                      </Pressable>
                      <Text onPress={linkTask} style={styles.linkButton}>
                        Change
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Pressable onPress={deleteLink}>
                        <MaterialIcons
                          name="delete"
                          size={20}
                          color="#293462"
                          style={styles.deleteButton}
                        />
                      </Pressable>
                      <Text onPress={deleteLink} style={styles.linkButton}>
                        Delete
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.containerBottom}>
            <MaterialIcons
              onPress={() => setModalCalendarVisible(true)}
              name="calendar-today"
              size={25}
              color="#293462"
              style={styles.font}
            />
            <Pressable onPress={() => priorityTask()}>
              <MaterialIcons
                name="star"
                size={25}
                color={priority ? "#EC9B3B" : "grey"}
                style={styles.priorityStar}
                value={priority ? 0 : 1}
              />
            </Pressable>
          </View>
          <TouchableOpacity style={styles.markDone} onPress={markAsDone}>
            <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
              Mark as Done
            </Text>
            <Feather
              style={{ marginLeft: "5%", textAlignVertical: "center" }}
              name="check"
              size={15}
              color="#00ab66"
            />
          </TouchableOpacity>
        </View>
        <FloatingAction
          actions={actions}
          color="#293462"
          showBackground={false}
          onPressItem={(name) => {
            if (name === "bt_gallery") {
              pickImage();
            } else if (name === "bt_camera") {
              takeCamImage();
            } else if (name === "bt_link") {
              linkTask();
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
    // flex: 1,
    paddingTop: "1%",
    paddingLeft: "3%",
    // marginTop: windowHeight * 0.05,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    // backgroundColor: "#000",
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
    height: windowHeight * 0.5,
    width: windowWidth * 0.8,
    // backgroundColor:'#000'
  },
  title: {
    fontSize: 30,
    paddingLeft: "3%",
    minWidth: "100%",
    textAlignVertical: "top",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginBottom: windowHeight * 0.02,
    fontFamily: "Poppins_600SemiBold",
  },
  description: {
    minWidth: "100%",
    // height: "60%",
    marginBottom: "10%",
    textAlignVertical: "top",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: "5%",
    paddingLeft: "3%",

    // backgroundColor: "#000"
    // position: "absolute",
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
    // marginTop: "-5%",
    // paddingBottom: "5%",
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
    color: "#EE6F57",
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
  imageButton: {
    marginTop: "5%",
    marginLeft: "3%",
    padding: "3%",
    alignItems: "center",
    fontFamily: "Poppins_400Regular",
  },

  editButton: {
    marginTop: "5%",
    paddingTop: "3%",
  },
  deleteButton: {
    marginTop: "5%",
    paddingTop: "3%",
  },
  linkButton: {
    marginTop: "5%",
    marginLeft: "3%",
    padding: "3%",
    fontFamily: "Poppins_400Regular",
  },
  markDone: {
    fontFamily: "Poppins_600SemiBold",
    marginTop: "5%",
    marginLeft: "10%",
    borderRadius: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "4%",
    paddingBottom: "3%",
    backgroundColor: "#fff",
    fontSize: 13,
    width: "40%",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
