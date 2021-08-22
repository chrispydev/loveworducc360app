import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../Firebase/firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { Icon } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';
import ProfileInfoCard from '../components/ProfileInfoCard';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from '../firebase/Firebase';
import * as ImagePicker from 'expo-image-picker';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SettingsScreen({ navigation }) {
  const [profile, setProfile] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [show, setShow] = useState(false);

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
    // setShow(true);
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
            const user = auth.currentUser;
            db.collection('profile')
              .doc(user.displayName)
              .update({
                profileImage: url,
              })
              .then((docRef) => {})
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
  };

  useEffect(() => {
    db.collection('profile').onSnapshot((snapshot) =>
      setProfile(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [navigation]);
  //   console.log(auth.currentUser.email);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView>
        <StatusBar style="auto" />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                  visible={false}
                  size="large"
                  color="#bd69db"
                  // textContent={'Loading...'}
                  textStyle={{ color: 'white', fontSize: 25 }}
                />
              </View>
            </>
          )}
          <View style={styles.backgroundWrapper}>
            <ImageBackground
              source={{ uri: 'https://www.w3schools.com/css/paris.jpg' }}
              resizeMode="cover"
              style={styles.image}
            >
              <TouchableOpacity style={{ width: 50, marginTop: 10 }}>
                <Icon
                  onPress={() => navigation.openDrawer()}
                  type="font-awesome-5"
                  name="bars"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <View style={styles.avatar}>
                {imageUrl ? (
                  <>
                    <Avatar
                      rounded
                      size={200}
                      source={{ uri: imageUrl }}
                      containerStyle={{ marginHorizontal: 10 }}
                    />
                  </>
                ) : (
                  <>
                    <Avatar
                      rounded
                      size={200}
                      source={{ uri: auth?.currentUser?.photoURL }}
                      containerStyle={{ marginHorizontal: 10 }}
                    />
                  </>
                )}

                {imageUrl ? (
                  <>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        backgroundColor: '#111',
                        padding: 15,
                        borderRadius: 100 / 2,
                        bottom: 30,
                        right: '20%',
                      }}
                      onPress={UploadImage}
                      activeOpacity={0.5}
                    >
                      <Icon
                        onPress={UploadImage}
                        type="font-awesome-5"
                        name="upload"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        backgroundColor: '#111',
                        padding: 15,
                        borderRadius: 100 / 2,
                        bottom: 30,
                        right: '20%',
                      }}
                      onPress={pickImage}
                      activeOpacity={0.5}
                    >
                      <Icon
                        onPress={pickImage}
                        type="font-awesome-5"
                        name="camera"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <View style={{ alignItems: 'center' }}>
                {profile?.map(({ id, data }) =>
                  data.email_address === auth?.currentUser.email ? (
                    <Text style={styles.profileName}>{data.full_name}</Text>
                  ) : null
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 7,
                  }}
                >
                  <Icon
                    name="map-marker-alt"
                    type="font-awesome-5"
                    color="#fff"
                    size={20}
                  />
                  {profile?.map(({ id, data }) =>
                    data.email_address === auth?.currentUser.email ? (
                      <Text style={styles.profileLocate}>
                        {data.hall_Hostel} - {data?.room_number}
                      </Text>
                    ) : null
                  )}
                </View>
              </View>
            </ImageBackground>
          </View>
          <View>
            {profile?.map(({ id, data }) =>
              data.email_address === auth?.currentUser.email ? (
                <ProfileInfoCard key={id} data={data} />
              ) : null
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundWrapper: {
    height: 320,
    position: 'relative',
    top: 0,
    marginBottom: 20,
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    // position: 'relative',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  profileLocate: { color: '#fff', fontSize: RFValue(15, 580), marginLeft: 5 },
  profileName: { color: '#fff', fontSize: RFValue(20, 580) },
});
