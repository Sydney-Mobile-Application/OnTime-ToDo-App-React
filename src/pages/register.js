import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Modal } from 'react-native';
import TermCondition from './termAndCondition';
import { useFont,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font'

export default function Register ({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })
  const [text, onChangeText] = React.useState("Useless Text");
  const [textEmail, onChangeTextEmail] = useState("");
  const [textUsername, onChangeTextUsername] = useState("");
  const [textPhone, onChangeTextPhone] = useState("");
  const [textPassword1, onChangeTextPassword1] = useState("");
  const [textPassword2, onChangeTextPassword2] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [registerDisable, setRegisterDisable] = useState(true);

  function closeModal() {
    setModalVisible(false)
    navigation.navigate('Sign In')
  }

  useEffect(() => {
    if (!textEmail.trim() || !textUsername.trim() || !textPhone.trim() || !textPassword1.trim() || !textPassword2.trim()){
      setRegisterDisable(true)
    } else {
      setRegisterDisable(false)
    }
  }, [textEmail, textUsername, textPhone, textPassword1, textPassword2])

  return (
    <View style={[styles.container, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
      <View style={styles.headerContent}>
        <Text style={styles.textTopFRegister}>Let's Get You Ready!</Text>
        <Text style={styles.textTopSRegister}>Fill This Form, And You Are Ready To Go!</Text>
      </View>
      <TextInput style={styles.inputRegister} onChangeText={onChangeTextEmail} placeholder="Email" />
      <TextInput style={styles.inputRegister} onChangeText={onChangeTextUsername} placeholder="Username" />
      <TextInput style={styles.inputRegister} onChangeText={onChangeTextPhone} placeholder="Phone Number" keyboardType={'phone-pad'} />
      <TextInput style={styles.inputRegister} onChangeText={onChangeTextPassword1} secureTextEntry={true} placeholder="Password" />
      <TextInput style={styles.inputRegister} onChangeText={onChangeTextPassword2} secureTextEntry={true} placeholder="Confirm Password" />
      <View style={styles.inlineText}>
        <Text style={{fontFamily:'Poppins_300Light'}}>Have An Account? </Text>
        <Pressable onPress={() => navigation.navigate('Sign In')}>
          <Text style={{fontFamily:'Poppins_600SemiBold'}}>Sign In</Text>
        </Pressable>
      </View>
      <Pressable style={[styles.buttonRegister, registerDisable ? {backgroundColor: 'rgba(108, 122, 137, 1)'} : '']} onPress={() => setModalVisible(true)} disabled={registerDisable}>
        <Text style={{fontFamily:'Poppins_600SemiBold',color: 'white', }}>Register</Text>
      </Pressable>
      <Text style={styles.textBottomSRegister}>By signing up, you agree to the Terms of Service and Privacy Policy.</Text>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <TermCondition closeModal={closeModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    width: '80%'
  },
  textTopFRegister: {
    fontFamily:'Poppins_600SemiBold',
    fontSize: 30,
    alignSelf: 'flex-start'
  },
  textTopSRegister: {
    fontFamily:'Poppins_300Light',
    fontSize: 25,
    marginBottom: 12
  },
  inputRegister: {
    fontFamily:'Poppins_300Light',
    height: 50,
    width: '80%',
    borderRadius: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: '#293462',
    padding: 10,
  },
  inlineText: {
    fontFamily:'Poppins_300Light',
    flexDirection:'row',
    flexWrap:'wrap',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  buttonRegister: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '80%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  textBottomSRegister: {
    fontFamily:'Poppins_400Regular',
    fontSize: 10
  }
});