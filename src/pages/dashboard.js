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
    <View>
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

        <Text style={styles.priority}>Priority</Text>

        <View style={styles.priorityCont}>
          <View style={styles.taskNear}>
            <Text style={styles.taskText}>Meeting with Project Team</Text>
            <Text style={styles.taskDate}>20 Sep</Text>
          </View>
          <View style={styles.taskNear2}>
            <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
            <Text style={styles.taskDate}>26 Sep</Text>
          </View>
        </View>

        <Text style={styles.upcoming}>Upcoming</Text>

        <View style={styles.upcomingCont}>
          <View style={styles.taskCommon}>
            <Text style={styles.taskText}>Meeting with Project Team</Text>
            <Text style={styles.taskDate}>20 Sep</Text>
          </View>
          <View style={styles.taskCommon2}>
            <Text style={styles.taskText}>Kerjakan Tugas PAM</Text>
            <Text style={styles.taskDate}>26 Sep</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  priorityHead: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    marginLeft: 20,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  priority: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    marginLeft: 20,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  upcoming: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    marginLeft: 20,
    alignSelf: "flex-start",
    // alignItems: 'left',
    // justifyContent: "flex-start",
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
    paddingLeft: 15,
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
    paddingLeft: 15,
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
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    alignSelf: "flex-end",
    marginRight: 8,
    marginBottom: 5,
  },
  notif: {
    fontSize: 13,
  },
  top: {
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    alignSelf:'flex-start',
    flexDirection:'row',
    paddingBottom:20,
  },
  left: {
    backgroundColor: "#FBFBFB",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  right: {
    backgroundColor: "#FBFBFB",
    alignSelf: "flex-end",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
  },
  highlight_text: {
    width: width_highlight,
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 19,
    fontWeight: "bold",
  },
});
