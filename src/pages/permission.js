import React, {useState} from 'react';
import { StyleSheet, View, Text, Switch, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font'

export default function Permission ({ navigation }) {
  const [switchValue1, setswitchValue1] = useState(false);
  const [switchValue2, setswitchValue2] = useState(false);
  const [switchValue3, setswitchValue3] = useState(false);
  const [switchValue4, setswitchValue4] = useState(false);
  const toggleSwitch1 = (value) => {
    setswitchValue1(value);
  }
  const toggleSwitch2 = (value) => {
    setswitchValue2(value);
  }
  const toggleSwitch3 = (value) => {
    setswitchValue3(value);
  }
  const toggleSwitch4 = (value) => {
    setswitchValue4(value);
  }
  
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
        <Pressable onPress={() => navigation.navigate("Setting Menu")}>
          <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        </Pressable>
        <Text style={styles.permissionTitle}>Permission Access</Text>
      </View>
      <View style={styles.permissionDetail}>
          <Text style={styles.bottomDetail}>Location</Text>
          <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch1} value = {switchValue1} />
      </View>
      <View style={styles.permissionDetail}>
          <Text style={styles.bottomDetail}>Camera</Text>
          <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch2} value = {switchValue2} />
      </View>
      <View style={styles.permissionDetail}>
        <Text style={styles.bottomDetail}>File Access</Text>
        <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch3} value = {switchValue3} />
      </View>
      <View style={styles.permissionDetail}>
        <Text style={styles.bottomDetail}>Calendar</Text>
        <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch4} value = {switchValue4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 50
  },

  permissionTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: 25,
    marginLeft: 7,
    fontFamily: 'Poppins_600SemiBold'
  },

    permissionDetail: {
    marginLeft: 7,
    color: '#293462',
    fontSize: 14,
    fontWeight: 'bold',
    // width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end'
  },

  bottomDetail: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular'
  },

    switch: {
    transform: [{ scaleX: 0.6}, { scaleY: 0.6}],
    width: '25%',
    // backgroundColor: 'red'
  },
});