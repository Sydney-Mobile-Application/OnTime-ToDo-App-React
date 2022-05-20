import React from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Conn
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPriorityData } from "../redux/actions";

import moment from "moment";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ToDoPriority({ navigation }) {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const toDoPriority = useSelector(
    (state) => state.toDoDataReducer.dataPriority
  );

  let userDataObj = [];

  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        userDataObj = JSON.parse(userData);

        getToDoDataPriority();
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
  };

  const getToDoDataPriority = async () => {
    if (!userDataObj.length) {
      getDocs(
        query(
          collection(db, "notes"),
          where("userId", "==", userDataObj.uid.toString()),
          where("priority", "==", true)
        )
      ).then((querySnapshot) => {
        let dataCollection = [];

        if (querySnapshot.empty) {
          dispatch(setPriorityData([]));
        }

        try {
          querySnapshot.forEach((doc) => {
            // // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const toDoData = Object.assign({ uid: doc.id }, doc.data());

            dataCollection.push(toDoData);
          });

          dispatch(setPriorityData(dataCollection));
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

  let i = 0;

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
          {toDoPriority ? (
            toDoPriority.map((x) => {
              i++;
              return (
                <View style={styles.task} key={i}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate({
                        name: "Edit To Do",
                        params: { noteId: x.uid },
                      })
                    }
                  >
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
                        onPress={() => console.log("Add To Favourite")}
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
              <Text style={styles.taskText}>No Priority Task</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
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
    // marginLeft: windowWidth * 0.06,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  taskNear2: {
    width: 130,
    height: 120,
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
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.05,
    justifyContent: "center",
  },
  star: {
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.01,
    justifyContent: "center",
  },
  taskText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_400Regular",
    alignContent: "flex-start"
  },
  taskDate: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    alignSelf: "flex-start",
    marginTop: 10,
  },
});
