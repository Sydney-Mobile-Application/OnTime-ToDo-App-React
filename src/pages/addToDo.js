import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput, Pressable, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
import AddToDoCalendar from './addToDoCalendar';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const actions = [
  {
    text: "Camera",
    color: '#293462',
    // icon: require("./images/ic_accessibility_white.png"),
    name: "bt_camera",
    position: 2
  },
  {
    text: "Gallery",
    color: '#293462',
    // icon: require("./images/ic_language_white.png"),
    name: "bt_gallery",
    position: 1
  },
  {
    text: "Location",
    color: '#293462',
    // icon: require("./images/ic_room_white.png"),
    name: "bt_location",
    position: 3
  },
  {
    text: "URL",
    color: '#293462',
    // icon: require("./images/ic_videocam_white.png"),
    name: "bt_link",
    position: 4
  }
];


export default function AddToDo ({ navigation }) {
  const [textEmail, onChangeTextEmail] = useState("");
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  function closeCalendarModal() {
    setModalCalendarVisible(false)
  }
  return (
    <View style={styles.container}>

      <View style={styles.containertop}>
        <View style={styles.back} >
          <Pressable onPress={() => navigation.navigate('Dashboard')}>
            <MaterialIcons name='arrow-back' size={30} color='#293462'/>
          </Pressable>
        </View>
        <View style={styles.settings} >
          <MaterialIcons  name='settings' size={30} color='#293462'/>
        </View>
      </View>
      <View style={styles.task}>
          <TextInput style={styles.title} onChangeText={onChangeTextEmail}  placeholder="Title " />
          <TextInput style={styles.description} onChangeText={onChangeTextEmail} multiline={true} placeholder="Description " />
          <FloatingAction   
          actions={actions}
          color= '#293462'
          showBackground= {false}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
      </View>  
    
      <View style={styles.containerBottom}>
        <MaterialIcons  name='font-download' size={30} color='#293462' style={styles.font}/>
        <MaterialIcons onPress={() => setModalCalendarVisible(true)} name='calendar-today' size={30} color='#293462' style={styles.font}/>
        <Pressable onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.saveButton}>Save</Text>
        </Pressable>
        
      </View>
      <Modal animationType="slide" transparent={true} visible={modalCalendarVisible} onRequestClose={() => { setModalCalendarVisible(!modalCalendarVisible); }}>
        <AddToDoCalendar closeCalendarModal={closeCalendarModal} />
      </Modal>

    </View> 
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  containerBottom: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection:'row',
    // height: windowHeight,
  },
  containertop: {
    width: windowWidth,
    paddingTop: 30,
    backgroundColor: "#fff",
    flexDirection:"row",
    alignSelf: "center",
  },
  back: {
    marginLeft: windowWidth*0.08,
    marginTop: windowHeight*0.02,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  settings: {
    marginLeft: windowWidth*0.70,
    alignItems: 'flex-end',
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  task: {
    alignSelf: 'flex-start',
    marginTop: windowHeight*0.05,
    marginBottom:  windowWidth*0.1,
    marginLeft:  windowWidth*0.1,
    marginRight:  windowWidth*0.08,
    height: windowHeight*0.65,
    width: windowWidth*0.8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: windowHeight*0.02,
  },
  description: {
    fontSize: 20,
    // fontWeight: "semi-bold",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // maxHeight: windowHeight*0.8,
  },

  font: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: windowWidth*0.1,
  },
  saveButton: {
    marginLeft: windowWidth*0.35 ,
    borderRadius: 15,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#fff",
    backgroundColor: "#293462",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf:'flex-end',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});