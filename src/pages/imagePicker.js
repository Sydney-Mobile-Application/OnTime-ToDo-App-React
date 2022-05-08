import React from "react";
import {
    View,
    Button,
    Image,
    Stylesheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { black } from "react-native-paper/lib/typescript/styles/colors";

const TheImagePicker = ({ image, onImagePicked}) => {

    const [selectedImage, setSelectedImage] = useState();

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Pick an image', maxWidth: 800, maxHeight: 600},
            response => {
                if(response.error){
                    console.log("image error");
                } else {
                    console.log("Image:" + response.uri)
                    setSelectedImage({uri: response.uri})
                    onImagePicked({uri: response.uri});
                }
            }
        )
    }

    return (
        <View styles={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={}/>
            </View>
            <View styles={styles.button}>
                <Button title ="Pick Image" onPress={this.pickImageHandler}/>
            </View>
        </View>
    )
}

const style = StyleSheet.create ({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        height: 150,
    },
    button: {
        margin: 8
    }
})