import React, {useState, useEffect} from "react";
import {
    View,
    Button,
    Image,
    StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const TheImagePicker = ({ image, onImagePicked}) => {

    const [selectedImage, setSelectedImage] = useState();

    useEffect (() => {
        if(image) {
            console.log("useEffect: " + image);
            setSelectedImage({uri: image});
        }
    }, [image] )

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Pick an image', maxWidth: 800, maxHeight: 600},
            response => {
                if(response.error){
                    console.log("image error");
                } else {
                    console.log("Image: " + response.uri)
                    setSelectedImage({uri: response.uri})
                    onImagePicked({uri: response.uri});
                }
            }
        )
    }

    return (
        <View style ={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={selectedImage}/>
            </View>
            <View styles={styles.button}>
                <Button title ="Pick Image" onPress={this.pickImageHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
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

export default TheImagePicker;