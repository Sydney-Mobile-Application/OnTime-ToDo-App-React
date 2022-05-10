import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useAuth } from '../contexts/AuthContext';
import auth from '@react-native-firebase/auth';


import {
  useFont,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Firebase Conn
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

// Async Storoage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";
import { Alert } from "react-native-web";

export default function ForgotPassword({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const { forgotPassword } = useAuth();
  const [text, onChangeText] = React.useState("Useless Text");
  const [textEmail, onChangeTextEmail] = useState("");
  const [textPassword, onChangeTextPassword] = useState("");
  const [signInDisable, setSignInDisable] = useState(true);
  
//   const reset = async() => {
//     setShowLoading(true);
//     try {
//         await auth().sendPasswordResetEmail(textEmail);
//         setShowLoading(false);
//     } catch (e) {
//         setShowLoading(false);
//         Alert.alert(
//             e.message
//         );
//     }
// };
// const [showLoading, setShowLoading] = useState(false);

  //   useEffect(() => {
  //   if (!textEmail.trim() || !textPassword.trim()) {
  //     setSignInDisable(true);
  //   } else {
  //     setSignInDisable(false);
  //   }
  // }, [textEmail, textPassword]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate("Sign In")}>
            <MaterialIcons name="arrow-back" size={30} color="#293462" />
          </Pressable>
        </View>
        <View style={{ width: "80%" }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerContent}>Forgot Your Password?</Text>
            <Text style={styles.textTop}>Please enter registered email.</Text>
          </View>
        </View>
        <TextInput
          style={styles.inputEmail}
          value={textEmail}
          onChangeText={onChangeTextEmail}
          placeholder={"Email"}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />

        <Pressable
          style={styles.changePassword} 
          onPress={() => forgotPassword(textEmail).then(response => {
            console.log(response)
          })
          .catch(e => console.log(e.message))
          }>
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Submit
          </Text>
        </Pressable>

        {/* <Pressable
          style={styles.changePassword} onPress={() => navigation.navigate('Verify Email')}>
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Submit
          </Text>
        </Pressable> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: 80,
    alignItems: "center",
  },
  
  back: {
    marginLeft: windowWidth * 0.08,
    marginBottom: windowHeight * 0.02,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  headerContent: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
  },
  
  textTop: {
    fontSize: 20,
    fontFamily: "Poppins_300Light",
    marginBottom: 12,
  },
  inputEmail: {
    height: 50,
    width: "80%",
    fontFamily: "Poppins_400Regular",
    borderRadius: 12,
    margin: 10,
    borderWidth: 1,
    borderColor: "#293462",
    padding: 10,
  },

  changePassword: {
    backgroundColor: "#293462",
    color: "#293462",
    width: "50%",
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
})

