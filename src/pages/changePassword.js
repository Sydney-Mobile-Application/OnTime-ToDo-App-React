import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  TextInput,
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

export default function ChangePassword({ navigation }) {
  const [switchValue, setswitchValue] = useState(false);
  const toggleSwitch = (value) => {
    setswitchValue(value);
  };

  const [text, onChangeText] = React.useState("Useless Text");
  const [textPassword, onChangeTextPassword] = useState("");
  const [signInDisable, setSignInDisable] = useState(true);

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
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="arrow-back" size={30} color="#293462" />
          </Pressable>
        </View>
        <View style={{ width: "80%" }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerContent}>Change Password</Text>
          </View>
        </View>
        <TextInput
          style={styles.inputPassword}
          onChangeText={onChangeTextPassword}
          secureTextEntry={true}
          placeholder="Old Password"
          placeholderTextColor="#a9b0ba"
        />
        <TextInput
          style={styles.inputPassword}
          onChangeText={onChangeTextPassword}
          secureTextEntry={true}
          placeholder="New Password"
          placeholderTextColor="#a9b0ba"
        />
        <TextInput
          style={styles.inputPassword}
          onChangeText={onChangeTextPassword}
          secureTextEntry={true}
          placeholder="Confirm New Password"
          placeholderTextColor="#a9b0ba"
        />
        <Pressable
          style={styles.changePassword}
          onPress={() => {
            onSubmitData();
          }}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Save
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
    fontSize: 30,
    marginBottom: 10,
  },

  inputPassword: {
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
    marginTop: 30,
    marginBottom: "5%"
  },
},
);
