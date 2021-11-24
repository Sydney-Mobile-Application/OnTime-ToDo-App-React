import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Alert } from 'react-native';

export default function TermAndCondition ({closeModal}) {
  const [buttonDisable, setButtonDisable] = useState(true);

  function enableButton() {
    setButtonDisable(false)
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Text style={styles.textTitleAccept}>Terms of Service & Privacy Policy.</Text>
        <ScrollView style={styles.scrollViewAccept} onScroll={({nativeEvent}) => { if (isCloseToBottom(nativeEvent)) {enableButton()}}}>
          <Text style={styles.textViewAccept}>
          Welcome to OnTime!
          {"\n"}{"\n"}
          These terms and conditions outline the rules and regulations for the use of OnTime Sydney's Website, located at OnTimeSydney.
          By accessing this website we assume you accept these terms and conditions. Do not continue to use OnTime if you do not agree to take all of the terms and conditions stated on this page.
          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
          {"\n"}{"\n"}
          Cookies
          {"\n"}{"\n"}
          We employ the use of cookies. By accessing OnTime, you agreed to use cookies in agreement with the OnTime Sydney's Privacy Policy.
          Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
          {"\n"}{"\n"}
          License
          {"\n"}{"\n"}
          Unless otherwise stated, OnTime Sydney and/or its licensors own the intellectual property rights for all material on OnTime. All intellectual property rights are reserved. You may access this from OnTime for your own personal use subjected to restrictions set in these terms and conditions.
          </Text>
        </ScrollView>
        <Pressable style={[styles.buttonAccept, buttonDisable ? {backgroundColor: 'rgba(108, 122, 137, 1)'} : '']} onPress={() => closeModal()} disabled={buttonDisable}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Accept</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  textTitleAccept: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  scrollViewAccept: {
    maxHeight: 350,
    marginBottom: 10
  },
  textViewAccept: {
    textAlign: 'justify'
  },
  buttonAccept: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});