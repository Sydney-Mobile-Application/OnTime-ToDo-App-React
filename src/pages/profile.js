import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

export default function Profile ({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
        style={styles.profilePicture}
        source={require('../../assets/profile1.jpeg')} />
      </View>

      <View style={styles.topName}>
        <Text style= {styles.name}>James - Kun</Text>
      </View>

      <View style={styles.profileDetail}>
        <View>
          <Text style={styles.left}>Email Address</Text>
          <Text style={styles.left}>Phone Number</Text>
          <Text style={styles.left}>Subscription</Text>
       </View>

      <View>
          <Text style={styles.right}>: James@gmail.com</Text>
          <Text style={styles.right}>: +62 81234567234</Text>
          <Text style={styles.right}>: Premium Lifetime</Text>
      </View>
      </View>
        <Pressable style={styles.changePassword} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Change Password</Text>
        </Pressable>

        <Pressable style={styles.signOut} onPress={() => navigation.navigate('Sign In')}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Out</Text>
        </Pressable>
        
        <Pressable style={styles.bottomText} onPress={() => navigation.navigate('Help Support')}>
          <Text style={styles.left}>Help & Support</Text>
        </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  top: {
    paddingTop: 130
  },

  topName: {
    marginTop: 30
  },

  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  profileDetail: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },

  left: {
    fontSize: 18,
    lineHeight: 40,
  },

  right: {
    fontSize: 18,
    lineHeight: 40,
  },

   changePassword: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '50%',
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },

  signOut: {
    backgroundColor: '#293462',
    color: '#293462',
    width: '50%',
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },

  bottomText: {
    marginTop: 110
  }
});