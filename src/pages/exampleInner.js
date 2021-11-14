import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function ProfileScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This Is First Page</Text>
      <Button
        title="Go To Second Page"
        onPress={() =>
          navigation.navigate('Example Double Inner Page')
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
});