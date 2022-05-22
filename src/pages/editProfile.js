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
import * as ImagePicker from "expo-image-picker"; // not react-image-picker
import uuid from "react-native-uuid";

// Firebase Conn
import { getApps, initializeApp } from "firebase/app";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  add,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

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

export default function EditProfile({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageURI, dataImage] = useState("");

  const [state, setState] = useState({
    userData: "",
    email: "",
    username: "",
    phone: "",
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

  const [email, onChangeText] = [state.userData.email];
  const [username, onChangeUser] = [state.userData.username];
  const [phone, onChangePhone] = [state.userData.phone];

  const onSubmitData = async () => {
    const myDoc = doc(db, "users", state.userData.uid);

    let dataPost = {};

    if (!imageURI) {
      dataPost = {
        email: state.email ? state.email.toLowerCase() : email,
        username: state.username ? state.username : username,
        phone: state.phone ? state.phone : phone,
        profileUrl: state.userData.profileUrl,
        createdDate: Timestamp.fromDate(new Date()),
      };
    } else {
      await uploadImage(imageURI);

      dataPost = {
        email: state.email ? state.email.toLowerCase() : email,
        username: state.username ? state.username : username,
        phone: state.phone ? state.phone : phone,
        profileUrl: state.downloadImageUrl,
        createdDate: Timestamp.fromDate(new Date()),
      };
    }

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
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log("Height:" + result.height);
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      dataImage(result.uri);
    }
  };

  const uploadImage = async (imageURI) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageURI, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), state.downloadImageUrl);

    const uploadTask = uploadBytesResumable(fileRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("uploadBytes Err : ", error);
      },
      () => {
        blob.close();

        return true;
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // });
      }
    );
  };

  const generateUniqueId = () => {
    let uniqueId = uuid.v4();

    if (uniqueId) {
      setState((prevState) => ({
        ...prevState,
        downloadImageUrl: uniqueId,
      }));
    }
  };

  useEffect(() => {
    generateUniqueId();
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
      // <View>
      //   <ScrollView
      //   showsVerticalScrollIndicator={false}
      //   showsHorizontalScrollIndicator={false}
      //   >
      <View style={styles.container}>
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate("Profile")}>
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

          <Pressable onPress={pickImage}>
            <SimpleLineIcons
              name="camera"
              size={20}
              color="#ABACF7"
              style={styles.editPicture}
            />
          </Pressable>
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
          <Text style={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}>
            Save
          </Text>
        </Pressable>
      </View>
      //   </ScrollView>
      // </View>
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
    // color: "#293462",
    width: "40%",
    // paddingHorizontal: "5%",
    // paddingVertical: "5%",
    height: 40,
    // marginVertical: "5%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
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
