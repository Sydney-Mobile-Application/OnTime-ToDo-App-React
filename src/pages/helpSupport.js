import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HelpSupport ({ navigation }) {
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
      <Text style={styles.helpSupportTitle}>Help & Support</Text>
    </View>

    <View style={styles.helpSupportDetail}>
        <View style={styles.helpSupportContainer}>
          <View style={styles.helpDetail}>
            <Text style={{marginRight: "5%"}}>
            <MaterialIcons 
              name="email" 
              size={25} 
              color="#293462"
              />
            </Text>
          <Text style={styles.description1}>ontimeapp@gmail.com</Text>
          </View>
       </View>
       <View style={styles.helpSupportContainer}>
          <View style={styles.helpDetail}>
            <Text style={{marginRight: "5%"}}>
            <MaterialIcons 
              name="phone" 
              size={25} 
              color="#293462"
              />
            </Text>
          <Text style={styles.description1}>+12-345-678-900</Text>
          </View>
       </View>
       <Pressable>
         <View style={styles.helpSupportContainer}>
          <View style={styles.helpDetail}>
            <Text style={{marginRight: "5%"}}>
            <MaterialIcons 
              name="auto-stories" 
              size={25} 
              color="#293462"
              />
            </Text>
          <Text style={styles.description1}>Tap to guide</Text>
          </View>
       </View>
       </Pressable>

       
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
    paddingTop: 50
  },

  helpSupportTitle: {
    fontSize: RFPercentage(3),
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: "10%",
    marginLeft: windowHeight * 0.01,
    fontFamily: 'Poppins_600SemiBold'
  },

  helpSupportContainer: {
    width: windowWidth *0.8 ,
    height: windowHeight * 0.1,
    borderRadius: 20,
    backgroundColor: '#FFECBF',
    paddingLeft: windowHeight * 0.03,
    // paddingTop: windowWidth * 0.04,
    marginBottom: "5%" ,
    alignItems: "flex-start",
    justifyContent: "center"
  },

  description:{
    lineHeight: 30,
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins_400Regular',
  },

  description1:{
    // lineHeight: 30,
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins_600SemiBold',
  },

  helpDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});