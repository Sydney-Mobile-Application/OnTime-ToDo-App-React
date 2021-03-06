import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GetStarted({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const getSavedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      if (userData !== null) {
        navigation.navigate("Dashboard");
      } else {
        console.log("no Data");
      }
    } catch (err) {
      console.log("error msg : ", err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("render");
      getSavedUserData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/background.png")}
          style={styles.image}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.topTitleGetStarted}>
              Get To Your Task, Right
            </Text>
            <Text style={styles.topTitleGetStarted1}>OnTime</Text>
          </View>
          <Image
            style={styles.iconGetStarted}
            source={require("../../assets/getstart.png")}
          />
          <Text style={styles.titleGetStarted}>OnTime</Text>
          <Text style={styles.bottomTitleGetStarted}>
            Complete Your Task OnTime!
          </Text>
          <View style={styles.inlineButton}>
            <Pressable
              style={styles.buttonRegister}
              onPress={() => navigation.navigate("Register")}
            >
              <Text
                style={{ fontFamily: "Poppins_400Regular", color: "white" }}
              >
                Register
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttonSignIn}
              onPress={() => navigation.navigate("Sign In")}
            >
              <Text style={{ fontFamily: "Poppins_400Regular" }}>Sign In</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconGetStarted: {
    width: 250,
    height: 250,
  },
  headerContainer: {
    width: "60%",
  },
  topTitleGetStarted: {
    color: "#082032",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    left: 0,
    alignSelf: "flex-start",
  },
  topTitleGetStarted1: {
    color: "#082032",
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
    left: 0,
    alignSelf: "flex-start",
  },
  titleGetStarted: {
    alignSelf: "center",
    fontSize: 40,
    fontFamily: "Poppins_600SemiBold",
  },
  bottomTitleGetStarted: {
    alignSelf: "center",
    fontFamily: "Poppins_300Light",
    paddingBottom: 10,
  },
  inlineButton: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "60%",
    backgroundColor: "#E8E8E8",
    borderRadius: 26,
  },
  buttonRegister: {
    backgroundColor: "#293462",
    color: "white",
    width: "50%",
    height: 50,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSignIn: {
    backgroundColor: "#E8E8E8",
    color: "#E8E8E8",
    width: "50%",
    height: 50,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
});
