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
  ScrollView,
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
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
              <Text style={{ fontFamily: "Poppins_400Regular" }}> 
              
             15 Ap
           
              
               </Text>
            </View>
            <View>
              <Text style={styles.username}>{state.userData.username}</Text>
            </View>
          </View>

          <View style={styles.right}>
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Text style={styles.profileSetting}>
                Settings{""}
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

          <View style={styles.doneTask}>
            <Text style={styles.taskTitle}>Done Task</Text>
            {/* <Text style={styles.taskDetail}>3</Text> */}
            {/* <Text style={styles.textInline}>Manage your task</Text> */}
          </View>
        </View>

        <View style={styles.bottomText}>
          <View style={styles.bottomTitle}>
            <Text style={styles.bottomDetail}>Dark Mode</Text>
            <Switch
              // rol
              trackColor={{ false: "#767577", true: "#293462" }}
              style={styles.switch}
              onValueChange={toggleSwitch}
              value={switchValue}
              
              
            />

        

          </View>



          <Pressable onPress={() => navigation.navigate("Language Setting")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Language</Text>
              <Text style={styles.bottomDetail}>
                English <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Backup Data")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Backup Data</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Help Support")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Help & Support</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Permission")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Permission</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("About")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>About</Text>
              <Text style={styles.bottomDetail}>
                <MaterialIcons name="arrow-forward-ios" size={12} />
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Sign In")}>
            <View style={styles.bottomTitle}>
              <Text style={styles.bottomDetail}>Sign Out</Text>
              
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
    fontSize: RFPercentage(3),

  },

  viewTop: {
    // width: windowWidth * 0.8,
    height: windowHeight * 0.15,
    alignContent: "space-between",
    justifyContent: "space-between",
    borderRadius: 25,
    marginTop: 20,
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
    backgroundColor: "#FFFFFF",
    width: windowHeight * 0.15,
    height: windowWidth * 0.09,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    fontWeight: "500",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  username: {
    marginTop: windowHeight * 0.02,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFPercentage(2),

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
    marginLeft: windowHeight * 0.25,
    marginTop: windowHeight * 0.025,
  },

  profileSetting: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins_400Regular",
    color: "#293462",
    position: "absolute",
    marginTop: windowHeight * 0.11,
    marginLeft: windowHeight * 0.15,
  },

  taskList: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: "80%",
  },

  taskTitle: {
   
    fontSize: RFPercentage(1.5),
    textAlign: "center",
    margin: 10,
    
  },

  taskDetail: {
    fontSize: RFPercentage(1.5),
    color: "#293462",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 75,
    position: "absolute",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },

  textInline: {
    fontSize: RFPercentage(1.5),
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
    marginTop: 20,
    color: "#293462",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    flexDirection: "column",
  },

  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },

  bottomDetail: {
    fontSize: RFPercentage(2),
    lineHeight: 45,
    fontFamily: "Poppins_400Regular",
  },

  bottomTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignContent: 'space-between',
    width: windowWidth * 0.8,
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
