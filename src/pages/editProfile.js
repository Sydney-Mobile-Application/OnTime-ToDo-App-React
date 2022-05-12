import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
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
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Conn
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function EditProfile({ navigation }) {
  const [state, setState] = useState({
    userData: "",
    email: "",
    username: "",
    phone: "",
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

  const [email, onChangeText] = [state.userData.email];
  const [username, onChangeUser] = [state.userData.username];
  const [phone, onChangePhone] = [state.userData.phone];

  const onSubmitData = () => {
    const myDoc = doc(db, "users", state.userData.uid);

    const dataPost = {
      email: state.email ? state.email.toLowerCase() : email,
      username: state.username ? state.username : username,
      phone: state.phone ? state.phone : phone,
    };

    console.log("datapost", dataPost);
    console.log("email", email);

    updateDoc(myDoc, dataPost)
      .then(() => {
        try {
          const userData = Object.assign({ uid: state.userData.uid }, dataPost);
          const value = JSON.stringify(userData);
          AsyncStorage.setItem("@userData", value);
        } catch (err) {
          console.log("Error Msg :", err);
        }

        Alert.alert("Success", "User Updated Successfully !");
        navigation.navigate("Profile");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
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
      <View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
      <View style={styles.container}>
        
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="arrow-back" size={30} color="#293462" />
          </Pressable>
        </View>
        <View style={styles.top}>
          <Image
            style={styles.profilePicture}
            source={require("../../assets/profile1.jpeg")}
          />

          <SimpleLineIcons
            name="camera"
            size={20}
            color="#ABACF7"
            style={styles.editPicture}
          />
        </View>

        {/* <View style={styles.topName}>
        <Text style= {styles.name}>James - Kun</Text>
      </View> */}

        <View style={styles.profileDetail}>
          <View>
            <Text>Email</Text>
            <TextInput
              style={styles.inputRegister}
              // onChangeText={onChangeText}
              onChangeText={(val) => {
                setState((prevState) => ({
                  ...prevState,
                  email: val,
                }));
              }}
              defaultValue={email}
              placeholder={state.userData.email}
            />
            <Text>Username</Text>
            <TextInput
              style={styles.inputRegister}
              onChangeText={(val) => {
                setState((prevState) => ({
                  ...prevState,
                  username: val,
                }));
              }}
              defaultValue={username}
              placeholder={state.userData.username}
            />
            <Text>Phone Number (ex : 81267714878) </Text>
            <TextInput
              style={styles.inputRegister}
              onChangeText={(val) => {
                setState((prevState) => ({
                  ...prevState,
                  phone: val,
                }));
              }}
              defaultValue={phone}
              placeholder={state.userData.phone}
              keyboardType={"phone-pad"}
            />
          </View>
        </View>
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
        </ScrollView>
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
  inputRegister: {
    fontFamily: "Poppins_300Light",
    height: 50,
    width: windowWidth * 0.8,
    borderRadius: 12,
    margin: "5%",
    borderWidth: 1,
    borderColor: "#293462",
    paddingLeft: "5%",
  },

  top: {
    // paddingTop: 90
  },

  topName: {
    marginTop: 30,
  },

  profilePicture: {
    opacity: 0.7,
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  name: {
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
  },

  profileDetail: {
    alignContent: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    width: windowWidth * 0.8,
  },

  left: {
    fontSize: 18,
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
    marginBottom: "5%"
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
  editPicture: {
    // backgroundColor: "#000",
    alignSelf: "flex-end",
  },
  bottomText: {
    marginTop: 110,
  },
  back: {
    marginLeft: windowWidth * 0.08,
    marginTop: windowHeight * 0.1,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
