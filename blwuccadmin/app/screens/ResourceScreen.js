import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import NativeImagePicker from '../components/ImagePicker';
import Spinner from 'react-native-loading-spinner-overlay';

import { useDispatch } from 'react-redux';

import firebase from '../firebase/Firebase';
import { TextInput } from 'react-native';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function ResourceScreen({ navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [fileLink, setFileLink] = React.useState(null);
  const [document, setDocument] = React.useState(null);
  const [uploading, setUploading] = useState(false);
  const docTypeFile = useRef(false);
  const [show, setShow] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setDocument(result.uri);
    setFileLink(null);
    console.log(result);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        navigation.navigate('login');
      }
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFileLink(result.uri);
    }
    setDocument(null);
    checkFileType();
  };

  const UploadDocument = async () => {
    setShow(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', document, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref('documents/upload')
      .child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          // console.log('download url: ', url);
          blob.close();
          return url;
        });
      }
    );
    setDocument(null);
    alert('Document Send Successfully');
    setShow(false);
  };
  const UploadImageVideo = async () => {
    setShow(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', fileLink, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref('images/upload')
      .child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          // console.log('download url: ', url);
          blob.close();
          return url;
        });
      }
    );
    alert('Document Send Successfully');
    setShow(false);
    setFileLink(null);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 40, paddingBottom: 20 }}>
      <StatusBar style="auto" />

      <View>
        <TouchableOpacity style={{ postition: 'relative', left: '-40%' }}>
          <Icon
            onPress={() => navigation.openDrawer()}
            type="font-awesome-5"
            name="bars"
            size={30}
            iconStyle={styles.icon1}
          />
        </TouchableOpacity>
      </View>
      {show === true && (
        <>
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 2,
              width: '100%',
              height: '100%',
            }}
          >
            <Spinner
              visible={show}
              // textContent={'Loading...'}
              textStyle={{ color: 'white', fontSize: 20 }}
            />
          </View>
        </>
      )}
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Send Ministry Materials To Members
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Choose Picture or Video" onPress={pickFile} />
        <Button title="Choose Document" onPress={pickDocument} />
      </View>
      {fileLink?.length > 2 && (
        <>
          <View style={{ flexDirection: 'row', marginTop: 40, padding: 10 }}>
            <TextInput
              style={{ flex: 1, borderWidth: 1 }}
              value={fileLink}
              placeholderTextColor="white"
            />
            <Button
              buttonStyle={{ padding: 10, margin: 10 }}
              title="send File"
              onPress={UploadImageVideo}
            />
          </View>
        </>
      )}

      {document?.length > 2 && (
        <View style={{ flexDirection: 'row', marginTop: 40, padding: 10 }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1 }}
            value={document}
            placeholderTextColor="white"
          />
          <>
            <Button
              buttonStyle={{ padding: 10, margin: 10 }}
              title="send Document"
              onPress={UploadDocument}
            />
          </>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});
