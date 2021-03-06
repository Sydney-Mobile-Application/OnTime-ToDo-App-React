import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, Image} from 'react-native';
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function BackupData ({ navigation }) {
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
    </View>
      <Text style={styles.backupTitle}>Backup Data</Text>

      <View style={styles.backupDetail}>
        <View>
          <Text style={styles.left}>Backup Data</Text>
          <Text style={styles.left}>Backup Location</Text>
       </View>
      <View>
          <Text style={styles.right}>: 10 October 2021</Text>
          <Text style={styles.right}>: Google Drive</Text>
      </View>
      </View>
      <Pressable style={styles.backupNow} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={{color: 'white', fontFamily: 'Poppins_400Regular'}}>
          


            Backup Now</Text>
        </Pressable>
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

  backupTitle: {
    fontSize: 25,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 20,
    marginLeft: windowHeight * 0.01,
    fontFamily: 'Poppins_600SemiBold'
  },

  backupDetail: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: windowHeight * 0.01,
  },

  left: {
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular',
    marginRight: "5%"
  },

  right: {
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular'
  },

  backupNow: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '35%',
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: windowHeight * 0.01,
  },

  profilePicture:{
    
    width: 30,
    height: 30,
  


  },
});