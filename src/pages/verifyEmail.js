import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, Linking, Image} from 'react-native';
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

export default function VerifyEmail ({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Pressable onPress={() => navigation.navigate("Forgot Password")}>
          <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        </Pressable>
      </View>
      <Image style={styles.profilePicture} source={require("../../assets/getstart.png")}/>
      <View style={styles.centerText}>
          <Text style={{fontFamily: "Poppins_400Regular", textAlign: "center" }}>
            We sent a confirmation to your email.{'\n'}Check your email and click on the confirmation link to continue.
          </Text>
            <Pressable onPress={() => Linking.openURL('#')} style={{marginTop: 20}}>
                {({ pressed }) =>
                <Text style={{textDecorationLine: 'underline',color: pressed ? '#EE6F57' : '#293462'}}>
                Resend Email</Text>
                }
            </Pressable> 
            <Pressable onPress={() => navigation.navigate("Verify On Email")}>
              <Text style={{marginTop: 20}}>Ini page after click confirmation link dari email</Text>
            </Pressable>
      </View>
    </View>
  );
  }
};

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

  centerText: {
    alignItems: "center",
    justifyContent: "center",
  },

  profilePicture:{
    width: windowWidth *0.6,
    height: windowHeight * 0.3 ,
    marginTop: "10%",
    marginBottom: "20%",
    position: "relative",
  },
})