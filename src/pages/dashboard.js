import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  Switch,
} from "react-native";

const width_name = "60%";
const width_highlight = "75%";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Dashboard() {
  return (
    <View style={styles.containertop}> 

      <View style={styles.top}>
        <View style={styles.left}>
          <Text style={styles.name}>Ohayou, James-kun!</Text>
          <Text style={styles.date}>20 Jun</Text>
        </View>

        <View style={styles.right}>
          <Image
            style={styles.avatar}
            source={require("../../assets/profile1.jpeg")}
          />
          <Text style={styles.notif}>20 tasks to do today</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.highlight}>
          <Text style={styles.highlight_text}>Meeting with project team</Text>
        </View>

        <View style={styles.Head} >
          <Text style={styles.priority}>Priority</Text>
          <Text style={styles.seeall}>See All</Text>
        </View>

        <View style={styles.priorityCont}>
          <View style={styles.taskNear}>
            <Text style={styles.taskText}>Meeting with Project Team</Text>
            <Text style={styles.taskDate}>20 Sep</Text>
          </View>
          <View style={styles.taskNear2}>
            <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
            <Text style={styles.taskDate2}>26 Sep</Text>
          </View>
        </View>

        <View style={styles.Head} >
          <Text style={styles.upcoming}>Upcoming</Text>
          <Text style={styles.seeall}>See All</Text>
        </View>

        <View style={styles.upcomingCont}>
          <View style={styles.taskCommon}>
            <Text style={styles.taskText}>Meeting with Project Team</Text>
            <Text style={styles.taskDate}>20 Sep</Text>
          </View>
          <View style={styles.taskCommon2}>
            <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
            <Text style={styles.taskDate2}>26 Sep</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containertop: {
    paddingTop: 30,
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
  Head: {
    fontWeight: "bold",
    marginLeft: 20,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  priority: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: windowWidth*0.25,
  },
  seeall: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 30,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    color: '#000000',
    opacity: 0.25,
    marginLeft: windowWidth*0.25,
  },
  upcoming: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    // marginLeft: 20,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: windowWidth*0.19,
  },
  priorityCont: {
    marginBottom: 30,
    flexDirection: "row",
  },
  upcomingCont: {
    marginBottom: 30,
    flexDirection: "row",
  },
  taskNear: {
    width: 131,
    height: 131,
    marginRight: 20,
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
    marginRight: 20,
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
    fontSize: 13,
  },
  top: {
    marginTop:20,
    backgroundColor: '#FBFBFB',
    flexDirection:'row',
    paddingBottom:20,
    paddingEnd:20,
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
  date: {
    marginTop: 17,
    marginLeft: 19,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  highlight: {
    margin: 20,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FFEDBF",
    width: windowWidth*0.75,
  },
  highlight_text: {
    width: windowWidth*0.5,
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 19,
    fontWeight: "bold",
  },
});
