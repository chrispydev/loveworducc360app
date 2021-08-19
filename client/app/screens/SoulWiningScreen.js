import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from '../firebase/Firebase';

export default function SoulWiningScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [hallHostel, setHallHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [show, setShow] = useState(false);

  const [loaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  function addSoul() {
    const user = firebase.auth().currentUser;
    if (
      name.length === 0 ||
      email.length === 0 ||
      phoneNumber.length === 0 ||
      hallHostel.length === 0 ||
      roomNumber.length == 0
    ) {
      alert('One field in empty');
    } else {
      setShow(true);
      firebase
        .firestore()
        .collection('soulswon')
        .add({
          full_name: name,
          email_address: email,
          phone_number: phoneNumber,
          hall_hostel: hallHostel,
          room_number: roomNumber,
          won_by: user.email,
        })
        .then((docRef) => {
          alert('Soul added successfully');
          setName('');
          setPhoneNumber('');
          setEmail('');
          setHallHostel('');
          setRoomNumber('');

          setShow(false);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 30, marginTop: 10, flex: 1 }}>
            <TouchableOpacity>
              <Icon
                onPress={() => navigation.openDrawer()}
                type="font-awesome-5"
                name="bars"
                size={30}
                color="#fff"
                iconStyle={styles.icon1}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.welcome}>
            <Text style={styles.welcomeText}>Enter Souls Detail</Text>
          </View>
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
                textStyle={{ color: '#fff', fontSize: 25 }}
              />
            </View>
          </>
        )}
        <View style={{ marginBottom: 25, marginTop: 40 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Full Name
          </Text>
          <TextInput
            style={styles.input}
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
            placeholderTextColor="white"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={phoneNumber}
            placeholder="Enter your contact"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
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
            placeholderTextColor="white"
            value={hallHostel}
            placeholder="Enter your Hall or Hostel"
            onChangeText={(hallHostel) => setHallHostel(hallHostel)}
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Room Number
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            value={roomNumber}
            placeholder="Enter your room number"
            onChangeText={(roomNumber) => setRoomNumber(roomNumber)}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={addSoul}
            // disabled={
            //   name.length === 0 ||
            //   email.length === 0 ||
            //   phoneNumber.length === 0 ||
            //   hallHostel.length === 0 ||
            //   roomNumber.length == 0
            //     ? true
            //     : false
            // }
          >
            <LinearGradient
              start={[0, 0.5]}
              end={[1, 0.5]}
              colors={['#bd69db', '#d55aaa']}
              style={{ borderRadius: 25 }}
            >
              <View style={styles.circleGradient}>
                <Text style={styles.visit}>Add Soul</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  signUp: {
    flexDirection: 'row',
    paddingVertical: 25,
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
