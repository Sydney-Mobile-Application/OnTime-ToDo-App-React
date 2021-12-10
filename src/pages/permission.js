import React, {useState} from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Permission () {
  const [switchValue, setswitchValue] = useState(false);
  const toggleSwitch = (value) => {
    setswitchValue(value);
  }
  
  return (
    <View style={styles.container}>
      <View>
        <MaterialIcons  name='arrow-back' size={30} color='#293462'/>
        <Text style={styles.permissionTitle}>Permission Access</Text>
      </View>
      <View style={styles.permissionDetail}>
        <View style={styles.leftText}>
        <Text style={styles.bottomDetail}>Location</Text>
        <Text style={styles.bottomDetail}>Camera</Text>
        <Text style={styles.bottomDetail}>File Access</Text>
        <Text style={styles.bottomDetail}>Calendar</Text>
      </View>
      <View style={styles.rightText}>
        <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch} value = {switchValue} />
        <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch} value = {switchValue} />
        <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch} value = {switchValue} />
        <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch} value = {switchValue} />
      </View>
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
    paddingTop: 100
  },

  permissionTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingTop: 30,
    marginBottom: 25,
    marginLeft: 7
  },

    permissionDetail: {
    marginLeft: 7,
    color: '#293462',
    fontSize: 14,
    fontWeight: 'bold',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end'
  },

  bottomDetail: {
    fontSize: 20,
    lineHeight: 40,
  },

    switch: {
    transform: [{ scaleX: 0.6}, { scaleY: 0.6}],
    width: '60%'
  },
});