import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker

// export default 
function TheImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);



    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

export default TheImagePicker;