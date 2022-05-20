import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  RefreshControl,
} from "react-native";

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

import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Conn
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setToDoData } from "../redux/actions";

import moment from "moment";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function toDoCompleted({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const toDoDone = useSelector((state) => state.toDoDataReducer.dataDone);

  let userDataObj = [];

  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        userDataObj = JSON.parse(userData);

        getToDoDataDone();
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
  };

  const getToDoDataDone = async () => {
    if (!userDataObj.length) {
      getDocs(
        query(
          collection(db, "notes"),
          where("userId", "==", userDataObj.uid.toString()),
          where("done", "==", true)
        )
      ).then((querySnapshot) => {
        let dataCollection = [];

        if (querySnapshot.empty) {
          dispatch(setDoneData([]));
        }

        try {
          querySnapshot.forEach((doc) => {
            // // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const toDoData = Object.assign({ uid: doc.id }, doc.data());

            dataCollection.push(toDoData);
          });

          dispatch(setDoneData(dataCollection));
        } catch (err) {
          console.log("Error Msg :", err);
        }
      });
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getSavedUserData();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          // horizontal={true}
          // showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.row}>
            {toDoDone.length > 0 ? (
              toDoDone.map((x) => {
                return (
                  <View style={styles.task}>
                    <Pressable onPress={() => console.log("Done Note")}>
                      <View style={styles.taskNear2}>
                        <Text style={styles.taskText}>
                          {capitalizeFirstLetter(x.title)}
                        </Text>
                        <Text style={styles.taskDate}>
                          {moment(new Date(x.date.seconds * 1000)).format(
                            "DD/MMM"
                          )}
                        </Text>
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
                        <Pressable
                          onPress={() => console.log("Add To Priority")}
                        >
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
              })
            ) : (
              <View style={styles.task}>
                <Text style={styles.taskText}>No Task is Done</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: windowHeight * 0.02,
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
    // marginLeft: windowWidth * 0.1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  taskNear2: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.15,
    borderRadius: 20,
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingLeft: "15%",
    paddingRight: "15%",
    alignSelf: "flex-end",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEDBF",
  },
  delete: {
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.06,
    justifyContent: "center",
  },
  star: {
    marginLeft: windowWidth * 0.0,
    marginTop: windowHeight * 0.01,
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
