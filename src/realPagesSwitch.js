import React from 'react';
import { StyleSheet, View, Button, Text, Image, ScrollView } from 'react-native';

export default function HomeScreen ({ navigation }) {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/getstart.png')}
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
      <Text>Real Pages</Text>
      <Button
        title="Go To Get Started"
        onPress={() =>
          navigation.navigate('Get Started')
        }
      />
      <Button
        title="Go To Register"
        onPress={() =>
          navigation.navigate('Register')
        }
      />
      <Button
        title="Go To Terms And Condition"
        onPress={() =>
          navigation.navigate('Terms And Condition')
        }
      />
      <Button
        title="Go To Sign In"
        onPress={() =>
          navigation.navigate('Sign In')
        }
      />
      <Button
        title="Go To Sign In Successfully"
        onPress={() =>
          navigation.navigate('Sign In Successfully')
        }
      />
      <Button
        title="Go To Dashboard"
        onPress={() =>
          navigation.navigate('Dashboard')
        }
      />
      <Button
        title="Go To Add To Do"
        onPress={() =>
          navigation.navigate('Add To Do')
        }
      />
      <Button
        title="Go To Edit To Do"
        onPress={() =>
          navigation.navigate('Edit To Do')
        }
      />
      <Button
        title="Go To Add To Do Setting"
        onPress={() =>
          navigation.navigate('Add To Do Setting')
        }
      />
      <Button
        title="Go To Add To Do Calendar"
        onPress={() =>
          navigation.navigate('Add To Do Calendar')
        }
      />
      <Button
        title="Go To Add To Do Time"
        onPress={() =>
          navigation.navigate('Add To Do Time')
        }
      />
      <Button
        title="Go To To Do Priority"
        onPress={() =>
          navigation.navigate('To Do Priority')
        }
      />
      <Button
        title="Go To To Do Upcoming"
        onPress={() =>
          navigation.navigate('To Do Upcoming')
        }
      />
      <Button
        title="Go To To Do Completed"
        onPress={() =>
          navigation.navigate('To Do Completed')
        }
      />
      <Button
        title="Go To Setting Menu"
        onPress={() =>
          navigation.navigate('Setting Menu')
        }
      />
      <Button
        title="Go To Profile"
        onPress={() =>
          navigation.navigate('Profile')
        }
      />
      <Button
        title="Go To Language Setting"
        onPress={() =>
          navigation.navigate('Language Setting')
        }
      />
      <Button
        title="Go To Backup Data"
        onPress={() =>
          navigation.navigate('Backup Data')
        }
      />
      <Button
        title="Go To Help Support"
        onPress={() =>
          navigation.navigate('Help Support')
        }
      />
      <Button
        title="Go To Permission"
        onPress={() =>
          navigation.navigate('Permission')
        }
      />
      <Button
        title="Go To About"
        onPress={() =>
          navigation.navigate('About')
        }
      />
      <Button
        title="Go To Change Password"
        onPress={() =>
          navigation.navigate('Change Password')
        }
      />
    </View>
    </ScrollView>
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