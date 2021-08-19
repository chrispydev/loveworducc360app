import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../firebase/Firebase';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const resetPassword = () => {
    setShow(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        setShow(false);
        alert(
          'Email has been sent to your gmail fellow the link to reset your password'
        );
        setEmail('');
      })
      .catch(function (error) {
        if (error) {
          setShow(false);
        }
        // An error happened.
      });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Welcome to Church</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.logo} source={require('../assets/UCCNEW.png')} />
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

        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 20, fontSize: 16 }}>
            Email Address
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            autoFocus={true}
            placeholderTextColor="white"
            placeholder="Enter your email address"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={resetPassword}
            disabled={email.length === 0}
          >
            <LinearGradient
              start={[0, 0.5]}
              end={[1, 0.5]}
              colors={['#bd69db', '#d55bad']}
              style={{ borderRadius: 25 }}
            >
              <View style={styles.circleGradient}>
                <Text style={styles.visit}>Reset Password</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'center',
              marginTop: 20,
            }}
          >
            <Text style={[styles.text, { marginTop: 10 }]}>
              If you have reset your password
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text
                style={[
                  styles.text2,
                  {
                    // color: '#777',
                    fontSize: 16,
                    fontWeight: 'bold',
                    backgroundColor: '#777',
                    padding: 10,
                    borderRadius: 25,
                  },
                ]}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    height: '100%',
    padding: 20,
  },
  welcome: { paddingBottom: 10 },
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
  logo: {
    height: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
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
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '200',
  },
  text2: {
    color: '#fff',
    fontSize: 14,
  },
});
