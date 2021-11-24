import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Modal } from 'react-native';
import TermCondition from './termAndCondition';

export default function Register ({ navigation }) {
  const [text, onChangeText] = React.useState("Useless Text");
  const [modalVisible, setModalVisible] = useState(false);

  function closeModal() {
    setModalVisible(false)
    navigation.navigate('Sign In')
  }

  return (
    <View style={[styles.container, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
      <View style={styles.headerContent}>
        <Text style={styles.textTopFRegister}>Let's Get You Ready!</Text>
        <Text style={styles.textTopSRegister}>Fill This Form, And You Are Ready To Go!</Text>
      </View>
      <TextInput style={styles.inputRegister} onChangeText={onChangeText} placeholder="Email" />
      <TextInput style={styles.inputRegister} onChangeText={onChangeText} placeholder="Username" />
      <TextInput style={styles.inputRegister} onChangeText={onChangeText} placeholder="Phone Number" />
      <TextInput style={styles.inputRegister} onChangeText={onChangeText} secureTextEntry={true} placeholder="Password" />
      <TextInput style={styles.inputRegister} onChangeText={onChangeText} secureTextEntry={true} placeholder="Confirm Password" />
      <View style={styles.inlineText}>
        <Text>Have An Account? </Text>
        <Pressable onPress={() => navigation.navigate('Sign In')}>
          <Text style={{fontWeight: 'bold'}}>Sign In</Text>
        </Pressable>
      </View>
      <Pressable style={styles.buttonRegister} onPress={() => setModalVisible(true)}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Register</Text>
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
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start'
  },
  textTopSRegister: {
    fontSize: 25,
    marginBottom: 12
  },
  inputRegister: {
    height: 50,
    width: '80%',
    borderRadius: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: '#293462',
    padding: 10,
  },
  inlineText: {
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
    fontSize: 10
  }
});