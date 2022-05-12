import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Conn
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setToDoData } from "../redux/actions";

import * as CallBack from "../index";

// Icon
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Tab = createMaterialTopTabNavigator();

function MyTabs({ navigation, upcoming }) {
  function checkerUpcoming() {
    if (upcoming) {
      const saver = "Upcoming";
      return saver;
    } else {
      const saver = "Priority";
      return saver;
    }
  }

  const dispatch = useDispatch();

  const [state, setState] = useState({
    userData: [],
    // toDoData: [],
  });

  let userDataObj = [];

  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        setState((prevState) => ({
          ...prevState,
          userData: JSON.parse(userData),
        }));

        userDataObj = JSON.parse(userData);

        getToDoData();
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
  };

  const getToDoData = async () => {
    if (!userDataObj.length) {
      getDocs(
        query(
          collection(db, "notes"),
          where("userId", "==", userDataObj.uid.toString())
        )
      ).then((querySnapshot) => {
        let dataCollection = [];

        if (querySnapshot.empty) {
          Alert.alert("Not Found", "Notes Not Found");
        }
        try {
          querySnapshot.forEach((doc) => {
            // // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            const toDoData = Object.assign({ uid: doc.id }, doc.data());

            dataCollection.push(toDoData);

            dispatch(setToDoData(dataCollection));
          });
        } catch (err) {
          console.log("Error Msg :", err);
        }
      });
    }
  };

  useEffect(() => {
    getSavedUserData();
  }, []);

  return (
    <>
      <View style={styles.containertop}>
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <MaterialIcons name="arrow-back" size={30} color="#293462" />
          </Pressable>
        </View>
      </View>

      <Tab.Navigator
        initialRouteName={checkerUpcoming()}
        screenOptions={{
          tabBarActiveTintColor: "#000000",
          tabBarLabelStyle: { fontSize: 12 },
          // tabBarStyle: {
          //   // backgroundColor: "powderblue",
          //   // marginTop: 50,
          // },
        }}
      >
        <Tab.Screen
          name="Priority"
          component={CallBack.ToDoPriority}
          initialParams={{ toDoData: state?.toDoData }}
          options={{ tabBarLabel: "Priority" }}
        />
        <Tab.Screen
          name="Upcoming"
          component={CallBack.ToDoUpcoming}
          options={{ tabBarLabel: "Upcoming" }}
        />
        <Tab.Screen
          name="Completed"
          component={CallBack.ToDoCompleted}
          options={{ tabBarLabel: "Done" }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function ToDoPriority({ route, navigation }) {
  const { upcoming } = route.params;
  return (
    <NavigationContainer independent={true}>
      <MyTabs upcoming={upcoming} navigation={navigation} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  containertop: {
    flexDirection: "row",
    width: windowWidth,
    paddingTop: 30,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  back: {
    marginLeft: windowWidth * 0.08,
    marginTop: windowHeight * 0.02,
    alignItems: "flex-start",
  },
  settings: {
    marginLeft: windowWidth * 0.7,
    alignSelf: "flex-end",
  },
});
