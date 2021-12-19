import React from 'react';
import { StyleSheet, View, Text, Pressable} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font'

export default function BackupData ({ navigation }) {
  let [fontsLoaded] = useFonts({
      Poppins_300Light,
      Poppins_400Regular,
      Poppins_600SemiBold,
      Poppins_700Bold,
      Poppins_800ExtraBold,
    })
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
          <Text style={{color: 'white', fontFamily: 'Poppins_400Regular'}}>Backup Now</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingTop: 50
  },

  backupTitle: {
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 20,
    marginLeft: 7,
    fontFamily: 'Poppins_600SemiBold'
  },

  backupDetail: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 7
  },

  left: {
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular'
  },

  right: {
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular'
  },

  backupNow: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '50%',
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 7
  },
});