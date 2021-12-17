import React from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as CallBack from "../index";

// Icon
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Tab = createMaterialTopTabNavigator();

function MyTabs({ upcoming }) {
  function checkerUpcoming() {
    if (upcoming) {
      const saver = "Upcoming";
      return saver;
    } else {
      const saver = "Priority";
      return saver;
    }
  }

  return (
    <>
      <View style={styles.containertop}>
        <View style={styles.back}>
          <Pressable onPress={() => console.log("go back history")}>
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

export default function ToDoPriority({ route }) {
  const { upcoming } = route.params;
  return (
    <NavigationContainer independent={true}>
      <MyTabs upcoming={upcoming} />
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
