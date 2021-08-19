import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import firebase from '../firebase/Firebase';
import UseButton from '../components/UseButton';
import NativeImagePicker from '../components/ImagePicker';
import { cleanUp } from '../redux/features/auth/userCacheSlice';
import { auth, db } from '../../Firebase/firebase';
import { Icon } from 'react-native-elements';

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [hallHostel, setHallHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [showHall, setShowHall] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
      } else {
        navigation.navigate('login');
        dispatch(cleanUp());
      }
    });
    return unsubscribe;
  }, []);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const UploadImage = async () => {
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
      xhr.open('GET', imageUrl, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref('images')
      .child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        alert(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            setDownloadUrl(url);
            const user = firebase.auth().currentUser;
            firebase
              .firestore()
              .collection('profile')
              .doc(user.displayName)
              .update({
                profileImage: url,
              })
              .then((docRef) => {
                // setShow(false);
                // setImageUrl(null);
                // alert('Profile picture updated');
              })
              .catch((error) => {
                alert('Error adding document: ', error);
              });

            auth.onAuthStateChanged((authUser) => {
              authUser.updateProfile({
                photoURL: url,
              });
            });
            setShow(false);
            setImageUrl(null);
            alert('Profile picture updated');
            setUploading(false);
            blob.close();
            return url;
          })
          .catch((error) => {
            alert(error);
          });
      }
    );

    // const user = firebase.auth().currentUser;
    // firebase
    //   .firestore()
    //   .collection('profile')
    //   .doc(user.displayName)
    //   .update({
    //     profileImage: downloadUrl,
    //   })
    //   .then((docRef) => {
    //     setShow(false);
    //     setImageUrl(null);
    //     alert('Profile picture updated');
    //   })
    //   .catch((error) => {
    //     alert('Error adding document: ', error);
    //   });

    // auth.onAuthStateChanged((authUser) => {
    //   authUser.updateProfile({
    //     photoURL: downloadUrl,
    //   });
    // });
  };

  function updateHosel() {
    setShow(true);
    const user = firebase.auth().currentUser;

    firebase
      .firestore()
      .collection('profile')
      .doc(user.displayName)
      .update({
        hall_Hostel: hallHostel,
      })
      .then((docRef) => {
        setShow(false);
        setShowHall(false);
        alert('Hall or Hostel Updated');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  }

  function updateRoom() {
    setShow(true);
    const user = firebase.auth().currentUser;

    firebase
      .firestore()
      .collection('profile')
      .doc(user.displayName)
      .update({
        room_number: roomNumber,
      })
      .then((docRef) => {
        setShow(false);
        setShowRoom(false);
        alert('Room number Updated');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <SafeAreaView style={{ marginHorizontal: 10 }}>
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <StatusBar style="auto" />
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity>
                <Icon
                  onPress={() => navigation.openDrawer()}
                  type="font-awesome-5"
                  name="bars"
                  size={30}
                  iconStyle={styles.icon1}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 30, padding: 10 }}>
              <View
                style={{
                  marginBottom: 25,
                  justifyContent: 'center',
                }}
              >
                <NativeImagePicker imageUrl={imageUrl} pickImage={pickImage} />
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
                      size="large"
                      color="#bd69db"
                      // textContent={'Loading...'}
                      textStyle={{ color: 'white', fontSize: 25 }}
                    />
                  </View>
                </>
              )}
              {imageUrl && (
                <>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity onPress={UploadImage}>
                      <LinearGradient
                        start={[0, 0.5]}
                        end={[1, 0.5]}
                        colors={['#bd69db', '#d55bad']}
                        style={{ borderRadius: 25 }}
                      >
                        <View style={styles.circleGradient}>
                          <Text style={styles.visit}>Modify</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              <View style={{ marginBottom: 10 }}>
                <Button
                  onPress={() => setShowHall(!showHall)}
                  buttonStyle={{ borderRadius: 25 }}
                  title="Modify your Hall or Hostel"
                  type="solid"
                />
              </View>
              {showHall && (
                <>
                  <View style={{ marginBottom: 25 }}>
                    <TextInput
                      style={styles.input}
                      value={hallHostel}
                      onSubmitEditing={updateHosel}
                      placeholderTextColor="#000"
                      placeholder="Modify your Hall or Hostel"
                      onChangeText={(hallHostel) => setHallHostel(hallHostel)}
                    />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      onPress={updateHosel}
                      disabled={hallHostel.length === 0 ? true : false}
                    >
                      <LinearGradient
                        start={[0, 0.5]}
                        end={[1, 0.5]}
                        colors={['#bd69db', '#d55bad']}
                        style={{ borderRadius: 25 }}
                      >
                        <View style={styles.circleGradient}>
                          <Text style={styles.visit}>Modify</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              <View style={{ marginBottom: 10 }}>
                <Button
                  onPress={() => setShowRoom(!showRoom)}
                  buttonStyle={{ borderRadius: 25 }}
                  title="Modify your room number"
                  type="solid"
                />
              </View>
              {showRoom && (
                <>
                  <View style={{ marginBottom: 25 }}>
                    <TextInput
                      style={styles.input}
                      value={roomNumber}
                      placeholderTextColor="#000"
                      placeholder="Modify your room Number"
                      onSubmitEditing={updateRoom}
                      onChangeText={(roomNumber) => setRoomNumber(roomNumber)}
                    />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      onPress={updateRoom}
                      disabled={roomNumber.length === 0 ? true : false}
                    >
                      <LinearGradient
                        start={[0, 0.5]}
                        end={[1, 0.5]}
                        colors={['#bd69db', '#d55bad']}
                        style={{ borderRadius: 25 }}
                      >
                        <View style={styles.circleGradient}>
                          <Text style={styles.visit}>Modify</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 52,
    borderRadius: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#555',
    textAlign: 'left',
  },
  input1: {
    height: 52,
    borderRadius: 30,
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#555',
    textAlign: 'left',
  },
  circleGradient: {
    margin: 1,
    height: 42,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
  visit: {
    margin: 4,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});
