import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NativeImagePicker({ pickImage, imageUrl }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(imageUrl);
    return () => {
      setImage(imageUrl);
    };
  }, [imageUrl]);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  return (
    <View>
      <Button
        buttonStyle={{
          backgroundColor: '#d55aaa',
          marginBottom: 20,
          width: '100%',
          borderRadius: 25,
          alignItems: 'center',
        }}
        onPress={pickImage}
        icon={<Icon name="user" size={20} color="white" />}
        title="Choose profile image   "
        iconRight
      />
      {image && (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 200 / 2,
            }}
          />
        </View>
      )}
    </View>
  );
}
