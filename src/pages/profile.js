import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Profile({ navigation }) {
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
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <MaterialIcons name="arrow-back" size={30} color="#293462" />
          </Pressable>
        </View>
        <View style={styles.top}>
          <Image
            style={styles.profilePicture}
            source={require("../../assets/profile1.jpeg")}
          />
        </View>

        <View style={styles.topName}>
          <Text style={styles.name}>{state.userData.username}</Text>
        </View>

        <View style={styles.profileDetail}>
          <View>
            <Text style={styles.left}>Email Address</Text>
            <Text style={styles.left}>Phone Number</Text>
            <Text style={styles.left}>Subscription</Text>
          </View>

          <View>
            <Text style={styles.right}>: {state.userData.email}</Text>
            <Text style={styles.right}>: +62{state.userData.phone}</Text>
            <Text style={styles.right}>: Premium Lifetime</Text>
          </View>
        </View>
        <Pressable
          style={styles.changePassword}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Edit Profile
          </Text>
        </Pressable>

        <Pressable
          style={styles.signOut}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Change Password
          </Text>
        </Pressable>

        <Pressable
          style={styles.signOut}
          onPress={() => navigation.navigate("Sign In")}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Sign Out
          </Text>
        </Pressable>

        <Pressable
          style={styles.bottomText}
          onPress={() => navigation.navigate("Help Support")}
        >
          <Text style={styles.left}>Help & Support</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  top: {
    // paddingTop: 90
  },

  topName: {
    marginTop: 30,
  },

  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  name: {
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
  },

  profileDetail: {
    width: "100%",
    // margin: "2%"
    justifyContent: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  left: {
    fontSize: 18,
    // marginRight: "2%",
    lineHeight: 40,
    fontFamily: "Poppins_400Regular",
  },

  right: {
    fontSize: 18,
    lineHeight: 40,
    fontFamily: "Poppins_400Regular",
  },

  changePassword: {
    backgroundColor: "#293462",
    color: "#293462",
    width: "50%",
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  signOut: {
    backgroundColor: "#293462",
    color: "#293462",
    width: "50%",
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  bottomText: {
    marginTop: "10%",
  },
  back: {
    marginLeft: windowWidth * 0.08,
    marginTop: windowHeight * 0.1,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
