import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  RefreshControl,
  Alert
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
import { getDocs, collection, query, where, deleteDoc, doc, } from "firebase/firestore";
import { db } from "../config/firebase";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setDoneData } from "../redux/actions";

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

  const onDeleteData = async (noteId) => {
    const deleteData = deleteDoc(doc(db, "notes", noteId));

    if (deleteData) {
      Alert.alert("Success", "Task deleted !");
      onRefresh();
    }
  };

  const deleteTask = async (noteId) => {
    Alert.alert("Delete this task?", "This task will be deleted", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => onDeleteData(noteId) },
    ]);
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
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={2}
                          style={styles.taskText}
                        >
                          {capitalizeFirstLetter(x.title)}
                        </Text>
                        <Text style={styles.taskDate}>
                          {moment(new Date(x.date.seconds * 1000)).format(
                            "DD MMM"
                          )}
                        </Text>
                      </View>
                    </Pressable>
                    <View>
                    <View>
                      <Pressable onPress={() => deleteTask(x.uid)}>
                          <MaterialIcons
                            name="delete"
                            size={16}
                            color="#ABACF7"
                            style={styles.delete}
                          />
                        </Pressable>
                    </View>
                      {/* <View>
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
                      </View> */}
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={styles.blank}>
                <Image
                  style={styles.notask}
                  source={require("../../assets/notask.png")}
                />
                  <Text
                    style={{
                      opacity: 0.2,
                      textAlignVertical: "center",
                      fontSize: 13,
                      fontFamily: "Poppins_400Regular",
                      marginVertical: "10%",
                      marginHorizontal: "10%",
                      alignItems: "center",
                      // maxPaddingBottom: windowHeight,
                    }}
                  >
                    Looks like you currently have no completed task 
                  </Text> 
               
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
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 20,
    marginRight: "9%",
    flexDirection: "row",
    marginBottom: "5%",
    // alignSelf: "flex-start",
    marginLeft: "7%",
    // justifyContent: "center",
    // backgroundColor: "#EC9B3B",
  },
  blank: {
    marginTop: "100%",
    borderRadius: 20,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  },
  taskNear2: {
    width: 120,
    height: 120,
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
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.01,
    justifyContent: "center",
  },
  taskText: {
    fontFamily: "Poppins_400Regular",
    color: "#293462",
    alignContent: "flex-start",
  },
  taskText1: {
    color: "#293462",
    fontFamily: "Poppins_400Regular",
    alignContent: "flex-start",
  },

  notask :{
    width: 100,
    height: 100,
    opacity : 0.2,
    marginLeft: "35%",
  },
  taskDate: {
    marginTop: 10,
    color: "#293462",
    alignSelf: "flex-start",
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
  },
});
