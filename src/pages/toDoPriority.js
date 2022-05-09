import React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ToDoPriority(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  console.log("props toDoData", props.route.params.toDoData);

  let dummyData = {
    data: [
      {
        id: "1",
        title: "kerjakan tugas PAM kerjakan tugas PAM kerjakan tugas PAM kerjakan tugas PAM",
        date: "26 Sept",
      },
      {
        id: "2",
        title: "kerjakan tugas Metpen",
        date: "27 Sept",
      },
      {
        id: "3",
        title: "kerjakan tugas B.Indo",
        date: "28 Sept",
      },
      {
        id: "4",
        title: "kerjakan tugas MASI",
        date: "29 Sept",
      },
      {
        id: "5",
        title: "Beli Dog Food untuk Doggy",
        date: "30 Sept",
      },
      {
        id: "6",
        title: "Meeting With Project Team",
        date: "1 Oct",
      },
      {
        id: "7",
        title: "Kerjain Progress KP",
        date: "5 Oct",
      },
      {
        id: "8",
        title: "Beli Batagor Nagoya",
        date: "7 Oct",
      },
      {
        id: "9",
        title: "Jangan Lupa Siram Tanaman",
        date: "9 Oct",
      },
      {
        id: "10",
        title: "Jangan Lupa Matiin Air",
        date: "12 Oct",
      },
      {
        id: "11",
        title: "Jangan Lupa Matiin Listrik",
        date: "20 Oct",
      },
      {
        id: "12",
        title: "Cuci Almamater UIB",
        date: "20 Oct",
      },
      {
        id: "13",
        title: "Beli Saham Indomaret",
        date: "27 Oct",
      },
      {
        id: "14",
        title: "Tidur di Tempat Kerja",
        date: "14 Nov",
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.row}>
          {dummyData.data.map((x) => {
            return (
              <View style={styles.task}>
                <Pressable onPress={() => console.log("Note Details")}>
                  <View style={styles.taskNear2}>
                    <Text ellipsizeMode='tail' numberOfLines={4} style={styles.taskText}>
                      {capitalizeFirstLetter(x.title)}
                    </Text>
                    <Text style={styles.taskDate}>{x.date}</Text>
                  </View>
                </Pressable>
                <View>
                  <View>
                    <Pressable onPress={() => console.log("Delete Note")}>
                      <MaterialIcons
                        name="delete"
                        size={16}
                        color="#ABACF7"
                        style={styles.delete}
                      />
                    </Pressable>
                  </View>
                  <View>
                    <Pressable onPress={() => console.log("Add To Favourite")}>
                      <MaterialIcons
                        name="star"
                        size={16}
                        color="#EC9B3B"
                        style={styles.star}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: windowHeight*0.02,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    paddingBottom: 12,
  },
  task: {
    borderRadius: 20,
    marginTop: "5%",
    marginLeft: windowWidth*0.06,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  taskNear2: {
    width: windowWidth*0.35,
    height: windowHeight*0.15,
    borderRadius: 20,
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingLeft: "15%",
    paddingRight: "15%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE6F57",
  },
  delete: {
    marginLeft: windowWidth*0.02,
    marginTop: windowHeight*0.05,
    justifyContent: "center",
  },
  star: {
    marginLeft: windowWidth*0.02,
    marginTop: windowHeight*0.01,
    justifyContent: "center",
  },
  taskText: {
    color: "#FFFFFF",
  },
  taskDate: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    alignSelf: "flex-start",
    marginTop: 10,
  },
});
