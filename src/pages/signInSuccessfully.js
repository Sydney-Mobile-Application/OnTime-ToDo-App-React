import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const App = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={styles.centeredView} onPress={() => navigation.navigate('Dashboard')} > 
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MaterialIcons name='check-circle-outline' size={80} color='#293462' style={styles.modalPic}/>
            <Text style={styles.modalText}>Welcome Back,</Text>
            <Text style={styles.modalText}>James-kun</Text>
            
              {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
            
          </View>
        </View>
        </Pressable>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)
        }
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingHorizontal:55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 20,
    textAlign: "center"
  },
  modalPic: {
    marginBottom:10,
  }
});

export default App;