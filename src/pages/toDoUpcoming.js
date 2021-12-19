import React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFont,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function toDoUpcoming() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })
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
                    <Pressable onPress={() => console.log("Share Note")}>
                      <MaterialIcons
                        name="share"
                        size={16}
                        color="#ABACF7"
                        style={styles.share}
                      />
                    </Pressable>
                  </View>
                  <View>
                    <Pressable onPress={() => console.log("Add To Favourite")}>
                      <MaterialIcons
                        name="star"
                        size={16}
                        color="rgba(0,0,0,0.12)"
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
    marginVertical: 30,
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
    width: 130,
    borderRadius: 20,
    marginTop: 10,
    margin: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
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
    // alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#5089C6",
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
  taskText: {
    color: "#FFFFFF",
    fontFamily:'Poppins_400Regular',
  },
  taskDate: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily:'Poppins_700Bold',
    alignSelf: "flex-start",
    marginTop: 10,
  },
});
