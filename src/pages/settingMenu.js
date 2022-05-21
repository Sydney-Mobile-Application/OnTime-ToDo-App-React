import React, { useState,Component, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  Alert,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import AsyncStorage from "@react-native-async-storage/async-storage";


import CalendarPicker from 'react-native-calendar-picker';
// import AddToDoTime from './addToDoTime';

//import {AppearanceProvider} from 'react-native-appearance';
//import apperanceprovider

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;






export default function SettingMenu({ navigation }) {
  const [switchValue, setswitchValue] = useState(false);
  const toggleSwitch = (value) => {
    setswitchValue(value);
  };

  const [state, setState] = useState({
    userData: "",
  });





  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        setState((prevState) => ({
          ...prevState,
          userData: JSON.parse(userData),
        }));
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
  };

  useEffect(() => {
    getSavedUserData();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });





  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ width: "80%" }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerContent}>Settings</Text>
          </View>
        </View>

        <View style={styles.viewTop}>
          {/* <View>
        <Image style={styles.profileContainer} source={require('../../assets/profileContainer.png')} />
      </View> */}
          {/* <View>
            <TouchableOpacity style={styles.bookmarkIcon}>
              <MaterialIcons name="bookmark" size={25} color="#082032" />
            </TouchableOpacity>
          </View> */}

          <View style={styles.left}>
            <View style={styles.today}>
            <MaterialIcons 
              name="bookmark" 
              size={30} 
              color="#082032"
              style={{}}
            />
            <Text style={styles.dateText}> 20 Jun</Text>
            </View>
            <View>
              <Text style={styles.username}>{state.userData.username}</Text>
            </View>
          </View>

          <View style={styles.right}>
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Text style={styles.profileSetting}>
                Edit Profile{""}
                <MaterialIcons name="arrow-forward-ios" size={10} />
              </Text>
              <Image
                style={styles.profilePicture}
                source={require("../../assets/profile1.jpeg")}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.taskList}>
          <Pressable
            onPress={() =>
              navigation.navigate("To Do Priority", { upcoming: false })
            }
          >
            <View style={styles.priorityTask}>
              <Text style={styles.taskTitle}>Priority Task</Text>
              {/* <Text style={styles.taskDetail}>7</Text> */}
              {/* <Text style={styles.textInline}>Manage your task</Text> */}
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate("To Do Upcoming", { upcoming: true })
            }
          >
            <View style={styles.upcomingTask}>
              <Text style={styles.taskTitle}>Upcoming Task</Text>
              {/* <Text style={styles.taskDetail}>15</Text> */}
              {/* <Text style={styles.textInline}>Manage your task</Text> */}
            </View>
          </Pressable>
          {/* <Pressable
          onPress={() =>
            navigation.navigate("To Do Completed", { done: true })
          }> */}
          <View style={styles.doneTask}>
            <Text style={styles.taskTitle}>Done Task</Text>
            {/* <Text style={styles.taskDetail}>3</Text> */}
            {/* <Text style={styles.textInline}>Manage your task</Text> */}
          </View>
          {/* </Pressable> */}
        </View>
        

        <View style={styles.bottomText}>
          {/* <View style={styles.bottomTitle}>
            <Text style={styles.bottomDetail}>Dark Mode</Text>
            <Switch
              // rol
              trackColor={{ false: "#767577", true: "#293462" }}
              style={styles.switch}
              onValueChange={toggleSwitch}
              value={switchValue}
            />
          </View> */}



          {/* <Pressable onPress={() => navigation.navigate("Language Setting")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Language</Text>
              <Text style={styles.bottomDetail}>
                English <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable> */}

          {/* <Pressable onPress={() => navigation.navigate("Backup Data")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Backup Data</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable> */}

          <Pressable onPress={() => navigation.navigate("Help Support")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Help & Support</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable>

          {/* <Pressable onPress={() => navigation.navigate("Permission")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Permission</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable> */}

          <Pressable onPress={() => navigation.navigate("About")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>About</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Sign In")}>
            <View style={[styles.bottomTitle,{
              justifyContent: "center",
              marginTop: "10%", 
              borderRadius: 20, 
              backgroundColor: "#b23b3b", 
              width: "45%",
              alignSelf: "flex-end"
              }]}>
              <Text 
              style={[
              {
              color: "#fff",
              fontSize: 20,
              lineHeight: 45,
              fontFamily: "Poppins_400Regular",
              // paddingLeft: "5%",
              // paddingRight: "5%",
              // paddingTop: "3%",
              // paddingBottom: "1%",
              alignSelf: "flex-end",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 5,}]}>
                Sign Out
                </Text>
              
            </View>
          </Pressable>
        </View>
      </View> //container
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: 75,
    alignItems: "center",
  },

  headerContainer: {
    alignSelf: "flex-start",
  },

  headerContent: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 30,
  },

  viewTop: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.15,
    alignContent: "space-between",
    justifyContent: "space-between",
    borderRadius: 25,
    marginTop: "5%",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#FBFBFB",
    zIndex: 3,
  },

  // bookmarkIcon: {
  //   paddingTop: windowHeight * 0.03,
  //   paddingLeft: 30,
  //   position: "relative",
  // },

  left: {
    marginTop: windowHeight * 0.025,
    marginLeft: windowHeight * 0.025,
    flexDirection: "column",
    position: "absolute",
    justifyContent: "flex-start",
  },

  today: {
    // backgroundColor: "#FFFFFF",
    width: windowHeight * 0.15,
    height: windowWidth * 0.09,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    fontWeight: "500",
    shadowColor: "#000",
    flexDirection: "row",
    
  },

  username: {
    marginBottom: windowHeight * 0.02,
    marginLeft: windowHeight * 0.02,
    marginTop: windowHeight * 0.02,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    width: windowHeight * 0.18,
  },

  right: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    // flex: 1,
    flexDirection: "column",
    marginHorizontal: 30,
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "relative",
    // alignSelf: "flex-end",
    marginLeft: windowHeight * 0.25,
    marginTop: windowHeight * 0.025,
  },

  profileSetting: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#293462",
    position: "absolute",
    marginTop: windowHeight * 0.11,
    marginLeft: windowHeight * 0.21,
  },

  taskList: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    width: "80%",
  },

  taskTitle: {
    fontSize: 12,
    padding: windowWidth * 0.02,
    // width: 72,
    fontFamily: "Poppins_400Regular",
    justifyContent: "center",
    alignItems: "center",
    
  },

  taskDetail: {
    fontSize: 0,
    color: "#293462",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 75,
    position: "absolute",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },

  textInline: {
    fontSize: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 6,
    color: "#9799A1",
    fontFamily: "Poppins_400Regular",
  },

  priorityTask: {
    width: windowWidth * 0.24,
    height: windowHeight * 0.1,
    backgroundColor: "#BFE4FF",
    flexDirection: "column",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    // marginVertical: 20,
  },

  upcomingTask: {
    width: windowWidth * 0.24,
    height: windowHeight * 0.1,
    backgroundColor: "#D3BFFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    // marginVertical: 20,
  },

  doneTask: {
    width: windowWidth * 0.24,
    height: windowHeight * 0.1,
    backgroundColor: "#FFECBF",
    borderRadius: 25,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    // marginVertical: 20,
  },

  bottomText: {
    marginTop: "10%",
    color: "#293462",
    fontSize: 14,
    fontWeight: "bold",
    flexDirection: "column",
  },

  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },

  bottomDetail: {
    fontSize: 20,
    lineHeight: 45,
    fontFamily: "Poppins_400Regular",
  },

  bottomTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignContent: 'space-between',
    width: windowWidth * 0.8,
    borderRadius: 40,
  },
  dateText: {
    marginTop: "3%",
    fontFamily: "Poppins_600SemiBold",
    marginLeft: "5%",
    borderRadius: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "5%",
    paddingBottom: "3%",
    backgroundColor: "#fff",
    fontSize: 13,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  // leftText: {
  //   justifyContent: 'flex-start',
  //   flexDirection: 'column',
  //   alignItems: 'flex-start'
  // },

  // rightText: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-end',
  //   alignItems: 'flex-end'
  // },
});
