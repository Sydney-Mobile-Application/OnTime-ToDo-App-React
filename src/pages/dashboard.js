import React, { useState, useEffect } from "react";
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

const width_name = "60%";
const width_highlight = "75%";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const image = { uri: "../../assets/profileContainer.png" };


export default function Dashboard({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState({
    userData: "",
  });

  const rightButtons = [
    <TouchableOpacity style={[styles.swipeTextRight]}>
      <Text style={styles.swipeTextContent}>
        Done
        {/* <MaterialIcons name="done" size={25} color="#000" /> */}
      </Text>
    </TouchableOpacity>,
    ,
  ];

  const leftButtons = [
    <TouchableOpacity
      style={[styles.swipeTextLeft]}
      onPress={() => navigation.navigate("Edit To Do", { upcoming: false })}
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
                  style={{
                    textAlignVertical: "center",
                    fontSize: 17,
                    fontFamily: "Poppins_600SemiBold",
                    marginLeft: "5%"
                  }}
                >
                  Meeting with project team
                </Text>
              </View>
              <View style={styles.time}>
                <MaterialIcons name="delete" size={12} color="#ABACF7" />
                <MaterialIcons name="access-time" size={45} color="#EC9B3B" />

                <View style={styles.detail}>
                  <MaterialIcons
                    name="notifications"
                    size={15}
                    color="#EC9B3B"
                  />
                  <Text style={styles.notifSmall}>02.45 PM</Text>
                </View>
                <Text style={styles.notifSmall}>10 minutes left</Text>
              </View>
            </View>
            <MaterialIcons name="done" size={25} color="#50C671" />
          </View>
        </Swipeable>
      );
    }
  }

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

  useEffect(() => {
    getSavedUserData();
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.containertop}>
            <ImageBackground
              source={require("../../assets/profileDashboard.png")}
              style={styles.image}
            >
              <View style={styles.top}>
                <View style={styles.left}>
                  <Text style={styles.name}>
                    Welcome, {state.userData.username}
                  </Text>

                  <View style={styles.date}>
                    <MaterialIcons name="bookmark" size={30} color="#082032" />
                    <Text style={styles.dateText}> 20 Jun</Text>
                  </View>
                </View>

                <View style={styles.right}>
                  <Pressable onPress={() => navigation.navigate("Profile")}>
                    <Image
                      style={styles.avatar}
                      source={require("../../assets/profile1.jpeg")}
                    />
                  </Pressable>
                  <View style={styles.date}>
                    <MaterialIcons name="check-box" size={15} color="#082032" />
                    <Text style={styles.notif}>20 tasks to do today</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>

            <View style={styles.container}>
              <MyListItem />
              {/* <View style={styles.containerhighlight}>
                <Text style={styles.reschedule}>Swipe here to reschedule</Text>
                <Text style={styles.markdone}>Swipe here to mark as done</Text>
              </View> */}

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
                <View style={styles.task}>
                  <View style={styles.taskNear}>
                    <Text style={styles.taskText}>
                      Meeting with Project Team
                    </Text>
                    <Text style={styles.taskDate}>20 Sep</Text>
                  </View>
                  <View>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="share"
                      size={15}
                      color="#ABACF7"
                      style={styles.share}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialIcons
                      name="star"
                      size={15}
                      color="#EC9B3B"
                      style={styles.star}
                    />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.task}>
                  <View style={styles.taskNear2}>
                    <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
                    <Text style={styles.taskDate2}>26 Sep</Text>
                  </View>
                  <View>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="share"
                      size={15}
                      color="#ABACF7"
                      style={styles.share}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialIcons
                      name="star"
                      size={15}
                      color="#EC9B3B"
                      style={styles.star}
                    />
                    </TouchableOpacity>
                  </View>
                </View>
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
                <View style={styles.task}>
                  <View style={styles.taskCommon}>
                    <Text style={styles.taskText}>
                      Meeting with Project Team
                    </Text>
                    <Text style={styles.taskDate}>28 Sep</Text>
                  </View>
                  <View>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="share"
                      size={15}
                      color="#ABACF7"
                      style={styles.share}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialIcons
                      name="star"
                      size={15}
                      color="#E5E5E5"
                      style={styles.star}
                    />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.task}>
                  <View style={styles.taskCommon2}>
                    <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
                    <Text style={styles.taskDate2}>27 Sep</Text>
                  </View>
                  <View>
                    <TouchableOpacity>
                    <MaterialIcons
                      name="share"
                      size={15}
                      color="#ABACF7"
                      style={styles.share}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialIcons
                      name="star"
                      size={15}
                      color="#E5E5E5"
                      style={styles.star}
                    />
                    </TouchableOpacity>
                  </View>
                </View>
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
    // paddingTop: 30,
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
    // marginLeft: 20,
    // alignSelf: "flex-start",
    justifyContent: "center",
    // marginLeft: -20,
    flexDirection: "row",
  },
  priority: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginBottom: "5%",
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
    marginBottom: "5%",
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
    maxWidth: 131,
    maxHeight: 131,
    borderRadius: 20,
    marginRight: "5%",
    flexDirection: "row",
    alignSelf: "flex-start",
    // justifyContent: "center",
    // backgroundColor: "#EC9B3B",
  },
  share: {
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
    width: "100%",
    height: "100%",
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
    backgroundColor: "#293462",
  },
  taskNear2: {
    width: "100%",
    height: "100%",
    marginLeft: "13%",
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
    width: "100%",
    height: "100%",
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
    width: "100%",
    height: "100%",
    marginLeft: "13%",
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
    fontWeight: "bold",
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
  taskp: {
    alignItems: "flex-end",
    fontFamily: "Poppins_400Regular",
    justifyContent: "flex-end",
    fontSize: 12,
    alignSelf: "flex-start",
  },
  dateText: {
    fontFamily: "Poppins_700Bold",
    marginLeft: "5%",
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
