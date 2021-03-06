import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  Switch,
  ScrollView,
  Modal,
  TouchableHighlight,
  Alert,
  LogBox,
  RefreshControl,
} from "react-native";
import {
  useFont,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";
import Swipeable from "react-native-swipeable";
import { TouchableWithoutFeedback } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Successfully from "./signInSuccessfully";
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import moment from "moment";

// Firebase
import {
  doc,
  updateDoc,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setToDoData, setPriorityDashboardData } from "../redux/actions";

const width_name = "80%";
const width_highlight = "75%";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const image = { uri: "../../assets/profileContainer.png" };

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function Dashboard({ navigation }) {
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [state, setState] = useState({
    userData: "",
    toDoPriority: [],
    toDoUpcoming: [],
    countTask: 0,
  });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    if (state.countTask > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Don't Forget To Do Your Task ! ????",
          body: `You Still Have ${state.countTask} Task To Do !`,
          data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
      });
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You can relax now ! ?????????????",
          body: `You have no task right now ????`,
          data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
      });
    }
  }

  async function schedulePushNotificationDD() {
    if (state.countTask-1 > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Don't Forget To Do Your Task ! ????",
          body: `You Still Have ${state.countTask-1} Task To Do !`,
          data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
      });
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You can relax now ! ?????????????",
          body: `You have no task right now ????`,
          data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
      });
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const onDoneData = () => {
    const myDoc = doc(db, "notes", toDoPriorityDashboard[0].uid);

    const dataPost = {
      done: true,
      priority: false,
    };

    updateDoc(myDoc, dataPost)
      .then(() => {
        Alert.alert("Success", "Task mark as Done !");
        getDDNotif();
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const onDeleteData = async () => {
    const deleteData = deleteDoc(
      doc(db, "notes", toDoPriorityDashboard[0].uid)
    );

    if (deleteData) {
      Alert.alert("Success", "Task deleted !");
      await onRefresh();
      getDDNotif();
    }
  };

  const deleteTask = async () => {
    Alert.alert("Delete this task?", "This task will be deleted", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => onDeleteData() },
    ]);
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
        },
      ]
    );
  };

  const rightButtons = [
    <TouchableOpacity style={[styles.swipeTextRight]} onPress={markAsDone}>
      <Text style={styles.swipeTextContent} onPress={markAsDone}>
        Done
        {/* <MaterialIcons name="done" size={25} color="#000" /> */}
      </Text>
    </TouchableOpacity>,
    ,
  ];

  const leftButtons = [
    <TouchableOpacity
      style={[styles.swipeTextLeft]}
      onPress={() => {
        navigation.navigate({
          name: "Edit To Do",
          params: { noteId: toDoPriorityDashboard[0].uid },
        });
      }}
    >
      <Text style={styles.swipeTextContent}>
        Reschedule
        {/* <MaterialIcons name="more-time" size={25} color="#000" /> */}
      </Text>
    </TouchableOpacity>,
  ];

  function MyListItem() {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      if (toDoPriorityDashboard.length > 0) {
        return (
          <Swipeable
            leftButtons={leftButtons}
            leftButtonWidth={100}
            rightButtonWidth={30}
            rightButtons={rightButtons}
          >
            <View style={styles.containerhighlight}>
              <MaterialIcons name="more-time" size={25} color="#EC9B3B" />
              <View style={styles.highlight}>
                <View style={styles.highlight_text}>
                  <Text
                    numberOfLines={2}
                    style={{
                      textAlignVertical: "center",
                      fontSize: 17,
                      fontFamily: "Poppins_600SemiBold",
                      marginLeft: "5%",
                    }}
                  >
                    {toDoPriorityDashboard !== "undefined"
                      ? toDoPriorityDashboard[0].title
                      : ""}
                  </Text>
                </View>
                <View style={styles.time}>
                  <MaterialIcons
                    name="delete"
                    size={12}
                    color="#ABACF7"
                    onPress={deleteTask}
                  />
                  <MaterialIcons name="access-time" size={45} color="#EC9B3B" />

                  <View style={styles.detail}>
                    <MaterialIcons
                      name="notifications"
                      size={15}
                      color="#EC9B3B"
                    />
                    <Text style={styles.notifSmall}>
                      {toDoPriorityDashboard
                        ? moment(
                            new Date(
                              toDoPriorityDashboard[0].date.seconds * 1000
                            )
                          )
                            .format("hh:mm A")
                            .toString()
                        : ""}
                    </Text>
                  </View>

                  <Text style={styles.notifSmall}>
                    {toDoPriorityDashboard
                      ? moment(
                          new Date(toDoPriorityDashboard[0].date.seconds * 1000)
                        )
                          .format("DD MMM yyyy")
                          .toString()
                      : ""}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="done" size={25} color="#50C671" />
            </View>
          </Swipeable>
        );
      } else {
        return (
          // <Swipeable
          //   leftButtons={leftButtons}
          //   leftButtonWidth={100}
          //   rightButtonWidth={30}
          //   rightButtons={rightButtons}
          // >
          <View style={styles.containerhighlight}>
            {/* <MaterialIcons name="more-time" size={25} color="#EC9B3B" /> */}
            <View style={styles.highlight}>
              <View style={styles.highlight_text}>
                <Text
                  numberOfLines={2}
                  style={{
                    textAlignVertical: "center",
                    fontSize: 17,
                    fontFamily: "Poppins_600SemiBold",
                    margin: "5%",
                  }}
                >
                  You don't have any active task right now
                </Text>
              </View>
            </View>
            {/* <MaterialIcons name="done" size={25} color="#50C671" /> */}
          </View>
          // </Swipeable>
        );
      }
    }
  }

  const getImageUrl = async (value) => {
    const fileRef = ref(getStorage(), value);
    await getDownloadURL(fileRef).then((downloadURL) => {
      setImage(downloadURL);
    });
  };

  let userDataObj = [];

  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        setState((prevState) => ({
          ...prevState,
          userData: JSON.parse(userData),
        }));
        userDataObj = JSON.parse(userData);

        getImageUrl(userDataObj.profileUrl);

        getCountTask();
        getToDoData();
        getToDoDataPriority();
        getToDoDataPriorityforDashboard();
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
  };

  const getCountTask = async () => {
    if (!userDataObj.length) {
      getDocs(
        query(
          collection(db, "notes"),
          where("userId", "==", userDataObj.uid.toString()),
          where("done", "==", false)
        )
      ).then((querySnapshot) => {
        let dataCollection = [];

        if (querySnapshot.empty) {
          setState((prevState) => ({
            ...prevState,
            countTask: 0,
          }));
        }

        try {
          querySnapshot.forEach((doc) => {
            // // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const toDoData = Object.assign({ uid: doc.id }, doc.data());

            console.log("data", toDoData);
            dataCollection.push(toDoData);
          });

          setState((prevState) => ({
            ...prevState,
            countTask: dataCollection.length,
          }));

          // dispatch(setToDoData(dataCollection));
        } catch (err) {
          console.log("Error Msg :", err);
        }
      });
    }
  };

  const getToDoData = async () => {
    if (!userDataObj.length) {
      getDocs(
        query(
          collection(db, "notes"),
          where("userId", "==", userDataObj.uid.toString()),
          where("priority", "==", false),
          where("done", "==", false),
          orderBy("date", "asc"),
          limit(2)
        )
      ).then((querySnapshot) => {
        let dataCollection = [];

        if (querySnapshot.empty) {
          setState((prevState) => ({
            ...prevState,
            toDoUpcoming: [],
          }));

          // dispatch(setToDoData());
        }

        try {
          querySnapshot.forEach((doc) => {
            // // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const toDoData = Object.assign({ uid: doc.id }, doc.data());

            dataCollection.push(toDoData);
          });

          setState((prevState) => ({
            ...prevState,
            toDoUpcoming: dataCollection,
          }));

          // dispatch(setToDoData(dataCollection));
        } catch (err) {
          console.log("Error Msg :", err);
        }
      });
    }
  };

  const getToDoDataPriority = async () => {
    if (!userDataObj.length) {
      getDocs(
        query(
          collection(db, "notes"),
          where("userId", "==", userDataObj.uid.toString()),
          where("priority", "==", true),
          where("done", "==", false),
          where("priority", "==", true),
          where("done", "==", false),
          orderBy("date", "asc"),
          limit(2)
        )
      ).then((querySnapshot) => {
        let dataCollection = [];

        if (querySnapshot.empty) {
          setState((prevState) => ({
            ...prevState,
            toDoPriority: [],
          }));

          // dispatch(setPriorityData([]));
        }

        try {
          querySnapshot.forEach((doc) => {
            // // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const toDoData = Object.assign({ uid: doc.id }, doc.data());

            dataCollection.push(toDoData);
          });

          setState((prevState) => ({
            ...prevState,
            toDoPriority: dataCollection,
          }));

          // dispatch(setPriorityData(dataCollection));
        } catch (err) {
          console.log("Error Msg :", err);
        }
      });
    }
  };

  const getToDoDataPriorityforDashboard = async () => {
    if (!userDataObj.length) {
      getDocs(
        query(
          collection(db, "notes"),
          where("userId", "==", userDataObj.uid.toString()),
          where("done", "==", false),
          orderBy("date", "asc"),
          limit(1)
        )
      ).then((querySnapshot) => {
        let dataCollection = [];

        if (querySnapshot.empty) {
          dispatch(setPriorityDashboardData([]));
        }

        try {
          querySnapshot.forEach((doc) => {
            // // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const toDoData = Object.assign({ uid: doc.id }, doc.data());

            dataCollection.push(toDoData);
          });

          dispatch(setPriorityDashboardData(dataCollection));
        } catch (err) {
          console.log("Error Msg :", err);
        }
      });
    }
  };

  const toDoPriorityDashboard = useSelector(
    (state) => state.toDoDataReducer.dataPriorityDashboard
  );

  // const toDoUpcoming = useSelector((state) => state.toDoDataReducer.data);
  const toDoUpcoming = state.toDoUpcoming;

  const toDoPriority = state.toDoPriority;

  const getNotif = (async () => {
    await schedulePushNotification();
    onRefresh()
  });

  const getDDNotif = (async () => {
    await schedulePushNotificationDD();
    onRefresh()
  });


  const onRefresh = React.useCallback(async () => {
    // await schedulePushNotification();
    setRefreshing(true);
    getSavedUserData();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getNotif();
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSavedUserData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          backgroundColor: "#fff",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: "#fff",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getNotif}  />
          }
        >
          <View style={styles.containertop}>
            <ImageBackground
              source={require("../../assets/profileDashboard.png")}
              style={styles.image}
            >
              <View style={styles.top}>
                <View style={styles.left}>
                  <Text style={styles.name}>
                    Welcome, {"\n"}
                    {state.userData.username}
                  </Text>

                  <View style={styles.date}>
                    <MaterialIcons name="bookmark" size={30} color="#082032" />
                    <Text style={styles.dateText}>
                      {moment(new Date()).format("DD MMM")}
                    </Text>
                  </View>
                </View>

                <View style={styles.right}>
                  <Pressable onPress={() => navigation.navigate("Profile")}>
                    {image ? (
                      <Image style={styles.avatar} source={{ uri: image }} />
                    ) : (
                      <Image
                        style={styles.avatar}
                        source={require("../../assets/profile1.jpg")}
                      />
                    )}
                  </Pressable>
                  <View style={styles.date}>
                    <MaterialIcons name="check-box" size={15} color="#082032" />
                    <Text style={styles.notif}>
                      {state.countTask} tasks to do left
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>

            <View style={[styles.container]}>
              <MyListItem />

              <View style={styles.Head}>
                <View>
                  <Text style={styles.priority}>Priority</Text>
                </View>

                <Pressable
                  onPress={() =>
                    navigation.navigate("To Do Priority", { upcoming: false })
                  }
                >
                  <Text style={styles.seeall}>See All</Text>
                </Pressable>
              </View>

              <View style={styles.priorityCont}>
                {toDoPriority.length > 0
                  ? toDoPriority.map((x) => {
                      return (
                        <View style={styles.task}>
                          <Pressable
                            onPress={() =>
                              navigation.navigate({
                                name: "Edit To Do",
                                params: { noteId: x.uid },
                              })
                            }
                          >
                            <View style={styles.taskNear2}>
                              <Text numberOfLines={2} style={styles.taskText}>
                                {x.title}
                              </Text>
                              <Text numberOfLines={2} style={styles.taskDate}>
                                {moment(new Date(x.date.seconds * 1000)).format(
                                  "DD MMM"
                                )}
                              </Text>
                            </View>
                          </Pressable>
                          <View>
                            <View>
                              <Pressable onPress={deleteTask}>
                                <MaterialIcons
                                  name="delete"
                                  size={16}
                                  color="#ABACF7"
                                  style={styles.delete}
                                />
                              </Pressable>
                            </View>
                            <View>
                              <MaterialIcons
                                name="star"
                                size={16}
                                color="#FF7D26"
                                style={styles.star}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    })
                  : [
                      <Image
                        style={[styles.notask, { marginLeft: "50%" }]}
                        source={require("../../assets/notask.png")}
                      />,
                      <Text
                        style={{
                          opacity: 0.2,
                          textAlignVertical: "center",
                          fontSize: 13,
                          fontFamily: "Poppins_400Regular",
                          marginLeft: "5%",
                          marginRight: "50%",
                        }}
                      >
                        You can add priority task by clicking star on adding
                        task!
                      </Text>,
                    ]}
              </View>

              <View style={styles.Head}>
                <Text style={styles.upcoming}>Upcoming</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate("To Do Upcoming", { upcoming: true })
                  }
                >
                  <Text style={styles.seeall}>See All</Text>
                </Pressable>
              </View>

              <View style={styles.upcomingCont}>
                {toDoUpcoming.length > 0
                  ? toDoUpcoming.map((x) => {
                      return (
                        <View style={styles.task}>
                          <Pressable
                            onPress={() =>
                              navigation.navigate({
                                name: "Edit To Do",
                                params: { noteId: x.uid },
                              })
                            }
                          >
                            <View style={styles.taskCommon}>
                              <Text numberOfLines={2} style={styles.taskText}>
                                {x.title}
                              </Text>
                              <Text numberOfLines={2} style={styles.taskDate}>
                                {moment(new Date(x.date.seconds * 1000)).format(
                                  "DD MMM"
                                )}
                              </Text>
                            </View>
                          </Pressable>
                          <View>
                            <View>
                              <Pressable onPress={deleteTask}>
                                <MaterialIcons
                                  name="delete"
                                  size={16}
                                  color="#ABACF7"
                                  style={styles.delete}
                                />
                              </Pressable>
                            </View>
                            <View>
                              <MaterialIcons
                                name="star"
                                size={16}
                                color="rgba(0,0,0,0.12)"
                                style={styles.star}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    })
                  : [
                      <Image
                        style={[styles.notask, { marginLeft: "50%" }]}
                        source={require("../../assets/notask.png")}
                      />,
                      <Text
                        style={{
                          opacity: 0.2,
                          textAlignVertical: "center",
                          fontSize: 13,
                          fontFamily: "Poppins_400Regular",
                          marginLeft: "5%",
                          marginRight: "50%",
                          // maxPaddingBottom: windowHeight,
                          paddingBottom: "25%",
                        }}
                      >
                        You can add upcoming task on adding task!
                      </Text>,
                    ]}
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Successfully userData={state.userData} closeModal={closeModal} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containertop: {
    paddingTop: "2%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingTop: "10%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  notask: {
    width: 50,
    height: 50,
    opacity: 0.2,
  },

  containerhighlight: {
    // backgroundColor: "#000",
    // paddingLeft: 30,
    // paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "15%",

    // marginLeft:10,
  },
  Head: {
    fontWeight: "bold",
    marginBottom: "5%",
    // alignSelf: "flex-start",
    justifyContent: "center",
    // marginLeft: -20,
    flexDirection: "row",
  },
  priority: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    // marginBottom: "5%",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: windowWidth * 0.25,
  },
  seeall: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    marginBottom: "5%",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    color: "#000000",
    opacity: 0.25,
    marginLeft: windowWidth * 0.25,
  },
  upcoming: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    // marginBottom: "5%",
    // marginLeft: 20,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: windowWidth * 0.19,
  },
  priorityCont: {
    marginBottom: "10%",
    flexDirection: "row",
  },
  upcomingCont: {
    marginBottom: "10%",
    flexDirection: "row",
  },
  task: {
    maxWidth: 130,
    maxHeight: 120,
    borderRadius: 20,
    marginRight: "5%",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: "3%",
    // justifyContent: "center",
    // backgroundColor: "#EC9B3B",
  },
  delete: {
    marginLeft: "15%",
    // marginRight: "5%",
    marginTop: "100%",
    // fontSize: "1%",
    justifyContent: "center",
  },
  star: {
    marginLeft: "15%",
    marginTop: "30%",
    justifyContent: "center",
  },
  taskNear: {
    width: 130,
    height: 120,
    // marginRight: "5%",
    // marginTop: 20,
    borderRadius: 20,
    paddingTop: "20%",
    paddingBottom: "12%",
    paddingLeft: "12%",
    paddingRight: "15%",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#EE6F57",
  },
  taskNear2: {
    width: 130,
    height: 120,
    borderRadius: 20,
    paddingTop: "20%",
    paddingBottom: "20%",
    paddingLeft: "15%",
    paddingRight: "15%",
    alignSelf: "flex-end",
    // alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#EE6F57",
  },
  taskCommon: {
    width: 130,
    height: 120,
    borderRadius: 20,
    paddingTop: "20%",
    paddingBottom: "12%",
    paddingLeft: "12%",
    paddingRight: "15%",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#5089C6",
  },
  taskCommon2: {
    width: 130,
    height: 120,
    borderRadius: 20,
    paddingTop: "20%",
    paddingBottom: "20%",
    paddingLeft: "15%",
    paddingRight: "12%",
    alignSelf: "flex-end",
    // alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#5089C6",
  },
  taskText: {
    fontFamily: "Poppins_400Regular",
    color: "#FFFFFF",
    alignItems: "flex-start",
    // fontSize: RFPercentage(2.),
  },
  taskDate: {
    marginTop: "5%",
    color: "#FFFFFF",
    alignSelf: "flex-start",
    fontFamily: "Poppins_700Bold",
    fontSize: 22,

    // paddingLeft: "11%",
  },
  taskDate2: {
    marginTop: "5%",
    color: "#FFFFFF",
    alignSelf: "flex-start",
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    alignSelf: "flex-end",
    // marginRight: 8,
    marginBottom: "4%",
  },
  notif: {
    fontFamily: "Poppins_400Regular",
    marginLeft: "5%",
    fontSize: 12,
    color: "#000000",
    opacity: 0.57,
  },
  notifSmall: {
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
    color: "#000000",
    opacity: 0.57,
  },
  reschedule: {
    fontSize: 9,
    color: "#000000",
    opacity: 0.57,
    alignSelf: "flex-start",
  },
  markdone: {
    fontSize: 9,
    color: "#000000",
    opacity: 0.57,
    alignSelf: "flex-end",
  },
  top: {
    margin: "5%",
    padding: "2%",

    // backgroundColor: '#FBFBFB',
    flexDirection: "row",
    // paddingBottom: 20,
    // paddingEnd: 20,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    width: "50%",
    // backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  right: {
    width: "50%",
    // backgroundColor: "#000",
    paddingRight: "3%",
    alignSelf: "flex-end",
  },
  name: {
    marginTop: "15%",
    marginLeft: "13%",
    width: width_name,
    fontFamily: "Poppins_700Bold",
    fontSize: 17,

    alignSelf: "flex-start",
  },
  // task: {
  //   alignItems: "flex-end",
  //   fontFamily: "Poppins_400Regular",
  //   justifyContent: "flex-end",
  //   fontSize: 12,
  //   alignSelf: "flex-start",
  // },
  dateText: {
    fontFamily: "Poppins_600SemiBold",
    // marginLeft: "5%",
    borderRadius: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "5%",
    paddingBottom: "3%",
    backgroundColor: "#fff",
    fontSize: 13,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  date: {
    fontFamily: "Poppins_400Regular",
    marginTop: "15%",
    flexDirection: "row",
    marginLeft: "10%",
  },
  highlight: {
    flexDirection: "row",
    margin: "2%",
    borderRadius: 20,
    paddingTop: "2%",
    paddingBottom: "2%",
    // paddingBottom: 30,
    paddingLeft: "1%",
    // paddingRight: 15,
    backgroundColor: "#FFEDBF",
    width: windowWidth * 0.75,
    height: "100%",
  },
  highlight_text: {
    // backgroundColor: '#fff',

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  time: {
    // backgroundColor: '#000',
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    // paddingTop: "10%",
    // marginTop: 10,
    fontFamily: "Poppins_600SemiBold",
    paddingRight: "5%",
    alignItems: "flex-end",
  },
  detail: {
    flexDirection: "row",
    paddingRight: "10%",
    fontFamily: "Poppins_600SemiBold",
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  swipeTextRight: {
    flex: 1,
    justifyContent: "center",
    // paddingLeft: 20,
    marginBottom: "5%",
  },
  swipeTextLeft: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    // paddingRight: 20,
    marginBottom: "5%",
  },
  swipeTextContent: {
    // backgroundColor:"#000",
    marginBottom: "10%",
    fontFamily: "Poppins_600SemiBold",
    // fontWeight: "bold",
  },
});
