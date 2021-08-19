import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
// import PasswordInputText from 'react-native-hide-show-password-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import NativeImagePicker from '../components/ImagePicker';
import firebase from '../firebase/Firebase';

const SignUp = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [secure, setSecure] = useState(true);
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

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

    const ref = firebase.storage().ref().child(new Date().toISOString());
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
          console.log('download url: ', url);
          blob.close();
          return url;
        });
      }
    );
  };

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setAuth(authUser);
        updateUser(authUser);
      })
      .catch((error) => {
        setShow(false);
        alert(error.message);
      });
    if (auth.length === 0) {
      setShow(true);
    }
    // firebase.auth().onAuthStateChanged((authUser) => {
    //   if (authUser) {
    //     setEmail("");
    //     setPassword("");
    //     setName("");
    //     setImageUrl("");
    //     setDate("");
    //     dispatch(cleanUp());
    //   }
    // });
  };
  const updateUser = (authUser) => {
    UploadImage();
    authUser.user.updateProfile({
      displayName: name,
      dateOfBirth: date,
      photoURL: imageUrl || 'https://chrispydev.vercel.app/images/banner.jpg',
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log('A date has been picked: ', date);
    setDate(date);
    hideDatePicker();
  };

  const [loaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <StatusBar style="auto" />
          <View style={styles.welcome}>
            <Text style={styles.welcomeText}>Welcome Admin</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={styles.logo}
              source={require('../assets/UCCNEW.png')}
            />
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
                  textContent={'Loading...'}
                  textStyle={{ color: 'white', fontSize: 20 }}
                />
              </View>
            </>
          )}
          <View style={{ marginBottom: 25 }}>
            <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
              Name
            </Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              placeholderTextColor="white"
              value={name}
              placeholder="Enter your full name"
              onChangeText={(name) => setName(name)}
            />
          </View>

          <View style={{ marginBottom: 25 }}>
            <Text style={{ color: 'white', paddingBottom: 20, fontSize: 16 }}>
              Email
            </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="white"
              value={email}
              placeholder="Enter your email address"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={{ marginBottom: 25 }}>
            <Text style={{ color: 'white', paddingBottom: 20, fontSize: 16 }}>
              Password
            </Text>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
            >
              <TextInput
                style={[styles.input1, { flex: 1 }]}
                keyboardType="default"
                value={password}
                placeholderTextColor="white"
                placeholder="Enter your  password"
                secureTextEntry={secure}
                onChangeText={(password) => setPassword(password)}
              />
              <Icon
                iconStyle={{ padding: 10 }}
                size={30}
                type="font-awesome-5"
                name={secure ? 'eye-slash' : 'eye'}
                color="white"
                onPress={() => setSecure(!secure)}
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: 25,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}
          >
            <NativeImagePicker imageUrl={imageUrl} pickImage={pickImage} />

            <View style={styles.date}>
              {/* <Text
              style={{
                color: 'white',
                fontSize: 18,
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              Click the Button to choose your date of births{' '}
            </Text> */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <Button
                buttonStyle={{ backgroundColor: '#d55aaa' }}
                icon={<Icon name="calendar-check-o" size={20} color="white" />}
                iconRight
                onPress={showDatePicker}
                title="Pick Date   "
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => register()}
              disabled={
                name.length === 0 ||
                email.length === 0 ||
                password.length === 0 ||
                date.length === 0
                  ? true
                  : false
              }
            >
              <LinearGradient
                start={[0, 0.5]}
                end={[1, 0.5]}
                colors={['#bd69db', '#d55aaa']}
                style={{ borderRadius: 25 }}
              >
                <View style={styles.circleGradient}>
                  <Text style={styles.visit}>Sign Up</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                UploadImage();
              }}
            >
              <Text>Upload</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.signUp}>
            <Text style={styles.text}>Already have an account?</Text>
            {/* () => navigation.navigate('signup') */}
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.text2}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    height: '100%',
    padding: 20,
  },
  welcome: { marginBottom: 10 },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'Pattaya',
  },
  logo: { height: 200, resizeMode: 'contain' },
  input: {
    height: 52,
    borderRadius: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#222',
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
  date: {
    // marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#111',
    borderColor: '#555',
  },
  signUp: {
    flexDirection: 'row',
    paddingVertical: 25,
  },
  text: { color: '#888', marginHorizontal: 15, fontSize: 15 },
  text2: { color: '#ffff', fontWeight: '900' },
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

export default SignUp;
