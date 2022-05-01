import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import { CurrentRenderContext } from '@react-navigation/native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { TouchableOpacity } from 'react-native-web';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function VerifyOnEmail ({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })

  const [text, onChangeText] = React.useState("Useless Text");
  const [textEmail, onChangeTextEmail] = useState("");
  const [textPassword, onChangeTextPassword] = useState("");
  const [signInDisable, setSignInDisable] = useState(true);

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
      {/* <View style={styles.back}>
        <Pressable onPress={() => navigation.navigate("Forgot Password")}>
          <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        </Pressable>
      </View> */}
      <View style={styles.headerContent}>
          <Text style={styles.textTopFSignIn}>Create New Password</Text>
          <Text style={styles.textTopSSignIn}>
            Your new password must be different from your old password.
          </Text>
       </View>
       <TextInput
          style={styles.inputPassword}
          onChangeText={onChangeTextPassword}
          secureTextEntry={true}
          placeholder="Enter New Password"
        />
        <TextInput
          style={styles.inputPassword}
          onChangeText={onChangeTextPassword}
          secureTextEntry={true}
          placeholder="Confirm New Password"
        />
        <Pressable
          style={styles.changePassword} onPress={() => {
            onSubmitData();
          }}>
          <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold" }}>
            Submit
          </Text>
        </Pressable>
    </View>
  );
  }
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
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
  inputPassword: {
    height: 50,
    width: "80%",
    fontFamily: "Poppins_400Regular",
    borderRadius: 12,
    margin: 12,
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