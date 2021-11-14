import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';

export default function HomeScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/getstart.png')}
      />
      <Button
        title="Go To Profile Page"
        onPress={() =>
          navigation.navigate('Example Profile', { name: 'Jane' })
        }
      />
      <Button
        title="Go To Another Page"
        onPress={() =>
          navigation.navigate('Example Inner Page')
        }
      />
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
  tinyLogo: {
    width: 150,
    height: 150,
  },
});