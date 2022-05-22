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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// Firebase
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzfGyrTOPd4_S0MRyFbpiMVWKRlOpRl60",
  authDomain: "todoapp-813f2.firebaseapp.com",
  databaseURL:
    "https://todoapp-813f2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todoapp-813f2",
  storageBucket: "todoapp-813f2.appspot.com",
  messagingSenderId: "532708203730",
  appId: "1:532708203730:web:bb80d5bec14d58c741610b",
  measurementId: "G-Y054Z4FKQ1",
};
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Profile({ navigation }) {
  const [image, setImage] = useState(null);

  const [state, setState] = useState({
    userData: "",
  });

  const getImageUrl = async (value) => {
    const fileRef = ref(getStorage(), value);
    await getDownloadURL(fileRef).then((downloadURL) => {
      setImage(downloadURL);
    });
  };

  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        setState((prevState) => ({
          ...prevState,
          userData: JSON.parse(userData),
        }));

        getImageUrl(JSON.parse(userData).profileUrl);
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
  };

  useEffect(() => {
    getSavedUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSavedUserData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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
          {image ? (
            <Image style={styles.profilePicture} source={{ uri: image }} />
          ) : (
            <Image
              style={styles.profilePicture}
              source={require("../../assets/profile1.jpg")}
            />
          )}
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
          onPress={() => navigation.navigate("Change Password")}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Change Password
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
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins_600SemiBold",
    marginRight: "10%",
    marginLeft: "10%",
    textAlign: "center",
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
    fontSize: RFPercentage(2),
    // marginRight: "2%",
    lineHeight: 40,
    fontFamily: "Poppins_400Regular",
  },

  right: {
    fontSize: RFPercentage(2),
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
    marginTop: "5%",
  },
  back: {
    marginLeft: windowWidth * 0.08,
    marginTop: windowHeight * 0.1,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
