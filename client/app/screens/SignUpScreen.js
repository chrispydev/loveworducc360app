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
  Platform,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
// import DatePicker from 'react-native-date-picker';
import DatePicker from 'react-native-modal-datetime-picker';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
// import PasswordInputText from 'react-native-hide-show-password-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';

import NativeImagePicker from '../components/ImagePicker';
import firebase from '../firebase/Firebase';

const SignUp = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hallHostel, setHallHostel] = useState('');
  const [selectedFellowShip, setSelectedFellowShip] = useState();
  const [date, setDate] = useState([]);
  const [dateType, setDateType] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [secure, setSecure] = useState(true);
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState([]);

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
  };
  const updateUser = (authUser) => {
    authUser.user.updateProfile({
      displayName: name,
      photoURL: imageUrl || 'https://www.w3schools.com/w3images/avatar2.png',
    });

    firebase
      .firestore()
      .collection('profile')
      .doc(name)
      .set({
        full_name: name,
        email_address: email,
        hall_Hostel: hallHostel,
        fellowship: selectedFellowShip,
        phone_number: phone,
        date_of_birth: date || dateType,
      });

    // firebase.firestore().collection('attended').add({
    //   displayName: name,
    //   phoneNumber: phone,
    //   timeAttended: firebase.firestore.FieldValue.serverTimestamp(),
    // });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
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
      {/* <SafeAreaView> */}
      <ScrollView>
        <StatusBar style="auto" />
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Welcome to Church</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {Platform.os === 'android' || Platform.os === 'ios' ? (
            <Image
              style={styles.logo}
              source={require('../assets/UCCNEW.png')}
            />
          ) : (
            <View style={{ width: 200, height: 200 }}>
              <ImageBackground
                source={require('../assets/logo1.png')}
                resizeMode="cover"
                style={{ width: 200, height: 200 }}
              ></ImageBackground>
            </View>
          )}
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
                color="#bd69db"
                // textContent={'Loading...'}
                textStyle={{ color: 'white', fontSize: 20 }}
              />
            </View>
          </>
        )}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Full Name
          </Text>
          <TextInput
            style={styles.input}
            // autoFocus={true}
            placeholderTextColor="white"
            value={name}
            placeholder="Enter your full name"
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Phone Number
          </Text>
          <TextInput
            style={styles.input}
            // autoFocus={true}
            placeholderTextColor="white"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={phone}
            placeholder="Enter your contact"
            onChangeText={(phone) => setPhone(phone)}
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
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Hall or Hostel
          </Text>
          <TextInput
            style={styles.input}
            // autoFocus={true}
            placeholderTextColor="white"
            value={hallHostel}
            placeholder="Enter your Hall or Hostel"
            onChangeText={(hallHostel) => setHallHostel(hallHostel)}
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Fellowship
          </Text>
          <View
            style={{
              borderColor: '#555',
              borderWidth: 1,
              borderRadius: 25,
              color: '#fff',
            }}
          >
            <Picker
              style={{ color: 'white' }}
              dropdownIconColor="white"
              itemStyle={{ fontSize: 30 }}
              selectedValue={selectedFellowShip}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedFellowShip(itemValue)
              }
            >
              <Picker.Item
                label="Choose your fellowship"
                value="Choose your fellowship"
              />
              <Picker.Item label="Mimshack" value="mimshack" />
              <Picker.Item label="Ambassadors" value="ambassadors" />
              <Picker.Item label="loveworld Generals" value="loveworld" />
              <Picker.Item label="Pleroma " value="pleroma" />
              <Picker.Item label="Avans Guards " value="avans" />
            </Picker>
          </View>
        </View>
        {/* <Text>{console.log(phone)}</Text> */}

        {/* <Text>{console.log(`new date ${date}`)}</Text> */}
        {Platform.os === 'android' || Platform.os === 'ios' ? (
          <View style={styles.date}>
            <DatePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Button
              buttonStyle={{
                backgroundColor: '#d55aaa',
                borderRadius: 25,
                width: '100%',
              }}
              icon={<Icon name="calendar-check-o" size={20} color="white" />}
              iconRight
              onPress={showDatePicker}
              title="Date of Birth "
            />
          </View>
        ) : (
          <View style={{ marginBottom: 25 }}>
            <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
              Date of Birth
            </Text>
            <TextInput
              style={styles.input}
              // autoFocus={true}
              placeholderTextColor="white"
              value={dateType}
              placeholder="20/20/20221"
              onChangeText={(dateType) => setDateType(dateType)}
            />
          </View>
        )}
        {date.length > 0 ? (
          <>
            <View style={{ marginBottom: 25 }}>
              <TextInput
                style={styles.input}
                // autoFocus={true}
                placeholderTextColor="white"
                value={date}
                placeholder="Your date of Birth"
                onChangeText={(name) => setName(name)}
              />
            </View>
          </>
        ) : null}
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
                paddingRight: 10,
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
              size={25}
              type="font-awesome-5"
              name={secure ? 'eye-slash' : 'eye'}
              color="white"
              onPress={() => setSecure(!secure)}
            />
          </View>
        </View>

        {/* <View
            style={{
              marginBottom: 25,
            }}
          >
            <NativeImagePicker imageUrl={imageUrl} pickImage={pickImage} />
          </View> */}

        <View>
          <TouchableOpacity
            onPress={() => register()}
            disabled={
              name.length === 0 || email.length === 0 || password.length === 0
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
        <View style={{ height: 100 }} />
      </ScrollView>
      {/* </SafeAreaView> */}
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
    flex: 1,
    marginBottom: 25,
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
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
