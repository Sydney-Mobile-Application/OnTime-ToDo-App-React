import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, Image } from 'react-native';
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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function About ({ navigation }) {
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
      <View>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        </Pressable>
        <Text style={styles.aboutTitle}>About ToDoApp</Text>
      </View>

      <Image
                style={styles.profilePicture}
                source={require("../../assets/getstart.png")}
              />

      <View style={styles.aboutDetail}>
      <Text style={styles.aboutDescription}>ToDoApp is an application designed to assist users in completing daily tasks on time {"\n"}</Text>
      <Text style={styles.aboutfooter}>Version 1.0 Alpha</Text>
      <Text style={styles.aboutfooter}>Build 1.0032468</Text>
      </View>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: windowHeight * 0.04,
    paddingTop: 50,
  },

  profilePicture:{
    width: windowWidth *0.5,
    height: windowHeight * 0.2 ,
    borderRadius: 50,
    position: "relative",
    marginLeft: windowHeight * 0.08,
    marginBottom : windowHeight * 0.03,

  },
  
  aboutTitle: {
    fontSize: RFPercentage(3),
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 30,
    marginLeft: windowHeight * 0.01,
    fontFamily: 'Poppins_600SemiBold'
  },
  
  aboutDetail: {
    marginLeft: windowHeight * 0.01,
    width: "85%"
  },
  
  aboutDescription: {
    fontSize: RFPercentage(2),
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify',
    marginTop: 10,
  },

  aboutfooter: {
    fontSize: RFPercentage(1.5),
    lineHeight: 30,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify',
    width: windowWidth * 0.78,
  }
});