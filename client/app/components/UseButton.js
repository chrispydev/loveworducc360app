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

export default function UseButton({ title, placeholder }) {
  const [room, setRoom] = useState('');
  const [show, setShow] = useState(false);
  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <Button
          onPress={() => setShow(!show)}
          buttonStyle={{ borderRadius: 25 }}
          title={title}
          type="solid"
        />
      </View>
      {show && (
        <>
          <View style={{ marginBottom: 25 }}>
            <TextInput
              style={styles.input}
              value={room}
              placeholderTextColor="#000"
              placeholder={placeholder}
              onChangeText={(room) => setRoom(room)}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
            // onPress={signIn}
            // disabled={
            //   email.length === 0 || password.length === 0 ? true : false
            // }
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
    </>
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
