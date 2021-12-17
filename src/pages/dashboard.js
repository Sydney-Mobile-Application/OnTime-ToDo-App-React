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
import { MaterialIcons } from "@expo/vector-icons";
import Swipeable from "react-native-swipeable";
import Successfully from "./signInSuccessfully";

const width_name = "60%";
const width_highlight = "75%";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const image = { uri: "../../assets/profileContainer.png" };

export default function Dashboard({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const rightButtons = [
    <TouchableHighlight
      style={[styles.swipeTextRight, { backgroundColor: "#00FF00" }]}
    >
      <Text style={styles.swipeTextContent}>
        {/* Done */}
        <MaterialIcons name="done" size={25} color="#000" />
      </Text>
    </TouchableHighlight>,
    <TouchableHighlight
      style={[styles.swipeTextRight, { backgroundColor: "#FF0000" }]}
    >
      <Text style={styles.swipeTextContent}>
        {/* Trash */}
        <MaterialIcons name="delete" size={25} color="#000" />
      </Text>
    </TouchableHighlight>,
  ];

  const leftButtons = [
    <TouchableHighlight
      style={[styles.swipeTextLeft, { backgroundColor: "#FFFF00" }]}
    >
      <Text style={styles.swipeTextContent}>
        {/* Reschedule */}
        <MaterialIcons name="more-time" size={25} color="#000" />
      </Text>
    </TouchableHighlight>,
  ];

  function MyListItem() {
    return (
      <Swipeable leftButtons={leftButtons} rightButtons={rightButtons}>
        <View style={styles.containerhighlight}>
          <MaterialIcons name="more-time" size={25} color="#000" />
          <View style={styles.highlight}>
            <Text style={styles.highlight_text}>Meeting with project team</Text>
            <View style={styles.time}>
              <MaterialIcons name="share" size={12} color="#ABACF7" />
              <MaterialIcons name="access-time" size={45} color="#EC9B3B" />

              <View style={styles.detail}>
                <MaterialIcons name="notifications" size={15} color="#EC9B3B" />
                <Text style={styles.notifSmall}>02.45 PM</Text>
              </View>
              <Text style={styles.notifSmall}>10 minutes left</Text>
            </View>
          </View>
          <MaterialIcons name="done" size={25} color="#000" />
        </View>
      </Swipeable>
    );
  }

  useEffect(() => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.containertop}>
          <ImageBackground
            source={require("../../assets/profileDashboard.png")}
            style={styles.image}
          >
            <View style={styles.top}>
              <View style={styles.left}>
                <Text style={styles.name}>Ohayou, James-kun!</Text>

                <View style={styles.date}>
                  <MaterialIcons name="bookmark" size={30} color="#082032" />
                  <Text style={styles.dateText}> 20 Jun</Text>
                </View>
              </View>

              <View style={styles.right}>
                <Pressable onPress={() => navigation.navigate("Setting Menu")}>
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
              <Text style={styles.priority}>Priority</Text>

              <Pressable onPress={() => navigation.navigate("To Do Priority")}>
                <Text style={styles.seeall}>See All</Text>
              </Pressable>
            </View>

            <View style={styles.priorityCont}>
              <View style={styles.task}>
                <View style={styles.taskNear}>
                  <Text style={styles.taskText}>Meeting with Project Team</Text>
                  <Text style={styles.taskDate}>20 Sep</Text>
                </View>
                <View>
                  <MaterialIcons
                    name="share"
                    size={10}
                    color="#ABACF7"
                    style={styles.share}
                  />
                  <MaterialIcons
                    name="star"
                    size={10}
                    color="#EC9B3B"
                    style={styles.star}
                  />
                </View>
              </View>
              <View style={styles.task}>
                <View style={styles.taskNear2}>
                  <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
                  <Text style={styles.taskDate2}>26 Sep</Text>
                </View>
                <View>
                  <MaterialIcons
                    name="share"
                    size={10}
                    color="#ABACF7"
                    style={styles.share}
                  />
                  <MaterialIcons
                    name="star"
                    size={10}
                    color="#EC9B3B"
                    style={styles.star}
                  />
                </View>
              </View>
            </View>

            <View style={styles.Head}>
              <Text style={styles.upcoming}>Upcoming</Text>
              <Pressable onPress={() => navigation.navigate("To Do Upcoming")}>
                <Text style={styles.seeall}>See All</Text>
              </Pressable>
            </View>

            <View style={styles.upcomingCont}>
              <View style={styles.task}>
                <View style={styles.taskCommon}>
                  <Text style={styles.taskText}>Meeting with Project Team</Text>
                  <Text style={styles.taskDate}>20 Sep</Text>
                </View>
                <View>
                  <MaterialIcons
                    name="share"
                    size={10}
                    color="#ABACF7"
                    style={styles.share}
                  />
                  <MaterialIcons
                    name="star"
                    size={10}
                    color="#EC9B3B"
                    style={styles.star}
                  />
                </View>
              </View>
              <View style={styles.task}>
                <View style={styles.taskCommon2}>
                  <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
                  <Text style={styles.taskDate2}>26 Sep</Text>
                </View>
                <View>
                  <MaterialIcons
                    name="share"
                    size={10}
                    color="#ABACF7"
                    style={styles.share}
                  />
                  <MaterialIcons
                    name="star"
                    size={10}
                    color="#EC9B3B"
                    style={styles.star}
                  />
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
        <Successfully closeModal={closeModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containertop: {
    // paddingTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingTop: 30,
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
    marginBottom: 20,

    // marginLeft:10,
  },
  Head: {
    fontWeight: "bold",
    marginLeft: 20,
    // alignSelf: "flex-start",
    justifyContent: "center",
    marginLeft: -20,
    flexDirection: "row",
  },
  priority: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: windowWidth * 0.25,
  },
  seeall: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 30,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    color: "#000000",
    opacity: 0.25,
    marginLeft: windowWidth * 0.25,
  },
  upcoming: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    // marginLeft: 20,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: windowWidth * 0.19,
  },
  priorityCont: {
    marginBottom: 30,
    flexDirection: "row",
  },
  upcomingCont: {
    marginBottom: 30,
    flexDirection: "row",
  },
  task: {
    width: 131,
    borderRadius: 20,
    marginRight: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
    // justifyContent: "center",
    // backgroundColor: "#EC9B3B",
  },
  share: {
    marginLeft: 5,
    marginTop: 30,
    justifyContent: "center",
  },
  star: {
    marginLeft: 5,
    marginTop: 10,
    justifyContent: "center",
  },
  taskNear: {
    width: 131,
    height: 131,
    // marginTop: 20,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    // paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#293462",
  },
  taskNear2: {
    width: 131,
    height: 131,
    marginLeft: 20,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#EE6F57",
  },
  taskCommon: {
    width: 131,
    height: 131,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    // paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#5089C6",
  },
  taskCommon2: {
    width: 131,
    height: 131,
    marginLeft: 20,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#5089C6",
  },
  taskText: {
    color: "#FFFFFF",
  },
  taskDate: {
    marginTop: 10,
    color: "#FFFFFF",
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 15,
  },
  taskDate2: {
    marginTop: 10,
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
    marginBottom: 5,
  },
  notif: {
    marginLeft: 5,
    fontSize: 12,
    color: "#000000",
    opacity: 0.57,
  },
  notifSmall: {
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
    marginTop: 20,
    paddingTop: 20,
    // backgroundColor: '#FBFBFB',
    flexDirection: "row",
    paddingBottom: 20,
    paddingEnd: 20,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    alignSelf: "flex-start",
  },
  right: {
    alignSelf: "flex-end",
  },
  name: {
    marginTop: 20,
    marginLeft: 25,
    width: width_name,
    fontWeight: "bold",
    fontSize: 19,
    alignSelf: "flex-start",
  },
  taskp: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    fontSize: 12,
    alignSelf: "flex-start",
  },
  dateText: {
    marginLeft: 5,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  date: {
    marginTop: 22,
    flexDirection: "row",
    marginLeft: 19,
  },
  highlight: {
    flexDirection: "row",
    margin: 10,
    borderRadius: 20,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FFEDBF",
    width: windowWidth * 0.75,
  },
  highlight_text: {
    paddingTop: 30,
    marginRight: 10,
    width: windowWidth * 0.5,
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 19,
    fontWeight: "bold",
  },
  time: {
    paddingTop: 20,
    marginTop: 10,
    // marginLeft:10,
    alignItems: "flex-end",
  },
  detail: {
    flexDirection: "row",
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
    paddingLeft: 20,
    marginBottom: 20,
  },
  swipeTextLeft: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    marginBottom: 20,
  },
  swipeTextContent: {
    fontWeight: "bold",
  },
});
