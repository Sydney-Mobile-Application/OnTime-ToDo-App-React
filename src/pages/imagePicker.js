import React from "react";
import {
    View,
    Button,
    Image,
    Stylesheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { black } from "react-native-paper/lib/typescript/styles/colors";

const imagePicker ({image, onImagePicked}) => {

    return (
        <View>
            <View>
                <Image source={}/>
            </View>
            <View styles={style.button}>
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