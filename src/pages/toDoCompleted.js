import React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function toDoCompleted() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let dummyData = {
    data: [
      {
        id: "1",
        title: "kerjakan tugas PAM",
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
      // {
      //   id: "6",
      //   title: "Meeting With Project Team",
      //   date: "1 Oct",
      // },
      // {
      //   id: "7",
      //   title: "Kerjain Progress KP",
      //   date: "5 Oct",
      // },
      // {
      //   id: "8",
      //   title: "Beli Batagor Nagoya",
      //   date: "7 Oct",
      // },
      // {
      //   id: "9",
      //   title: "Jangan Lupa Siram Tanaman",
      //   date: "9 Oct",
      // },
      // {
      //   id: "10",
      //   title: "Jangan Lupa Matiin Air",
      //   date: "12 Oct",
      // },
      // {
      //   id: "11",
      //   title: "Jangan Lupa Matiin Listrik",
      //   date: "20 Oct",
      // },
      // {
      //   id: "12",
      //   title: "Cuci Almamater UIB",
      //   date: "20 Oct",
      // },
      // {
      //   id: "13",
      //   title: "Beli Saham Indomaret",
      //   date: "27 Oct",
      // },
      // {
      //   id: "14",
      //   title: "Tidur di Tempat Kerja",
      //   date: "14 Nov",
      // },
    ],
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
                      <Text style={styles.taskText}>
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
                      <Pressable onPress={() => console.log("Add To Priority")}>
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
    backgroundColor: "#FFEDBF",
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
    fontFamily: "Poppins_400Regular",
    color: "#293462",
    fontSize: RFPercentage(2),
  },
  taskDate: {
    marginTop: 10,
    color: "#293462",
    alignSelf: "flex-start",
    fontFamily: "Poppins_700Bold",
    fontSize: RFPercentage(3),
    // paddingLeft: 15,
  },
});
