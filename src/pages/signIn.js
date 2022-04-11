import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  LogBox,
  Alert,
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

// Firebase Conn
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

// Async Storoage
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  LogBox.ignoreLogs(["Setting a timer"]);

  const [text, onChangeText] = React.useState("Useless Text");
  const [textEmail, onChangeTextEmail] = useState("");
  const [textPassword, onChangeTextPassword] = useState("");
  const [signInDisable, setSignInDisable] = useState(true);

  const onLogin = async () => {
    getDocs(
      query(
        collection(db, "users"),
        where("username", "==", textEmail.toString())
      )
    ).then((querySnapshot) => {
      if (querySnapshot.empty) {
        Alert.alert("Not Found", "Email Not Found");
      }
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        if (doc.data()["password"] === textPassword) {
          navigation.navigate("Dashboard");
          try {
            const userData = Object.assign({ uid: doc.id }, doc.data());
            const value = JSON.stringify(userData);
            AsyncStorage.setItem("@userData", value);
          } catch (err) {
            console.log("Error Msg :", err);
          }
        } else {
          Alert.alert("Error", "Password Incorrect !");
        }
      });
    });
  };

  useEffect(() => {
    if (!textEmail.trim() || !textPassword.trim()) {
      setSignInDisable(true);
    } else {
      setSignInDisable(false);
    }
  }, [textEmail, textPassword]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <Text style={styles.textTopFSignIn}>Let's Sign You In!</Text>
          <Text style={styles.textTopSSignIn}>
            Welcome Back. You've Been Missed!
          </Text>
        </View>
        <TextInput
          style={styles.inputSignIn}
          onChangeText={onChangeTextEmail}
          placeholder="Username"
        />
        <TextInput
          style={styles.inputSignIn}
          onChangeText={onChangeTextPassword}
          secureTextEntry={true}
          placeholder="Password"
        />
        <View style={styles.forgotPassword}>
          {/* <Pressable onPress={() => navigation.navigate("Register")}> */}
          <Pressable>
            <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <View style={styles.inlineText}>
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            Don't Have An Account Yet?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={{ fontFamily: "Poppins_600SemiBold" }}>Register</Text>
          </Pressable>
        </View>
        <Pressable
          style={[
            styles.buttonSignIn,
            signInDisable ? { backgroundColor: "rgba(108, 122, 137, 1)" } : "",
          ]}
          onPress={onLogin}
          disabled={signInDisable}
        >
          <Text style={{ fontFamily: "Poppins_600SemiBold", color: "white" }}>
            Sign In
          </Text>
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
    justifyContent: "center",
  },
  headerContent: {
    marginTop: "10%",
    width: "80%",
  },
  textTopFSignIn: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
    alignSelf: "flex-start",
  },
  textTopSSignIn: {
    fontSize: 20,
    fontFamily: "Poppins_300Light",
    marginBottom: 12,
  },
  inputSignIn: {
    height: 50,
    width: "80%",
    fontFamily: "Poppins_400Regular",
    borderRadius: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: "#293462",
    padding: 10,
  },
  forgotPassword: {
    fontFamily: "Poppins_600SemiBold",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    // alignItems: "flex-start",
    justifyContent: "flex-end",
    // marginTop: 225,
    // marginBottom: 12,
  },
  inlineText: {
    fontFamily: "Poppins_600SemiBold",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 225,
    marginBottom: 12,
  },
  buttonSignIn: {
    backgroundColor: "#293462",
    color: "#293462",
    width: "80%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
});
