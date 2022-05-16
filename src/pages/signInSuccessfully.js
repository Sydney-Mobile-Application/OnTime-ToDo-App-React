import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLinkProps } from "@react-navigation/native";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

const App = ({ closeModal, userData }) => {
  return (
    <View style={styles.centeredView}>
      <Pressable style={styles.centeredView} onPress={() => closeModal()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MaterialIcons
              name="check-circle-outline"
              size={80}
              color="#293462"
              style={styles.modalPic}
            />
            <Text style={styles.modalText}>Welcome Back,</Text>
            <Text style={styles.modalText}>{userData.username}</Text>

            {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
          </View>
        </View>
      </Pressable>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)
        }
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingHorizontal: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: 'Poppins_400Regular'
  },
  modalPic: {
    marginBottom: 10,
  },
});

export default App;
