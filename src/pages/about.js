import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, Image, ScrollView } from 'react-native';
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
    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.task}
        >
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        </Pressable>
        <Text style={styles.aboutTitle}>About ToDoApp</Text>
      </View>

      <Image
        style={styles.iconGetStarted}
        source={require('../../assets/getstart.png')}
      />

      <View style={styles.aboutDetail}>
      <Text style={styles.aboutDescription}>OnTime To Do App is an application designed to assist your day-to-day tasks on time and list everything that you want to do. It is helpful in planning your daily schedules. {"\n"}</Text>
      <Text style={styles.aboutfooter}>Version 1.0</Text>
      <Text style={styles.aboutfooter}>Build 1.0032468</Text>
      </View>
    </View>
    </ScrollView>
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
    height: windowHeight,
  },

  iconGetStarted : {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginLeft: -windowHeight * 0.05,
  },
  
  aboutTitle: {
    fontSize: RFPercentage(3),
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: "10%",
    marginLeft: windowHeight * 0.01,
    fontFamily: 'Poppins_600SemiBold'
  },
  
  aboutDetail: {
    marginLeft: windowHeight * 0.01,
    width: "80%"
  },
  
  aboutDescription: {
    fontSize: RFPercentage(2),
    lineHeight: 35,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify',
    marginTop: 10,
  },

  aboutfooter: {
    fontSize: RFPercentage(1.8),
    lineHeight: 30,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'justify',
    width: windowWidth * 0.78,
  }
});