import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

import firebase from '../firebase/Firebase';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
// import { BarCodeScanner } from 'expo-barcode-scanner';

import { userCache } from '../redux/features/auth/userCacheSlice';

import { Icon } from 'react-native-elements';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const signIn = (event) => {
    if (email.length === 0 || password.length === 0) {
      event.stopPropagation();
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        // var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setError(error.message);
        alert(error.message);
        setShow(false);
      });
    if (user.length === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
    // dispatch(cleanUp());
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setEmail('');
        setPassword('');
        dispatch(userCache(authUser));
        navigation.navigate('admin');
      }
    });
  };

  useLayoutEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.navigate('admin');
      }
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const [loaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        {/* <Qrcode /> */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Welcome to Church</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo1.png')} />
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
        >
          <View>
            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
              Scan for Attendance
            </Text>
            <TouchableOpacity
              style={{
                // borderWidth: 2,
                padding: 10,
                // borderColor: '#222',
                borderRadius: 25,
                marginBottom: 20,
                marginVertical: 30,
              }}
            >
              <Icon
                containerStyle={{ backgroundColor: '#111' }}
                name="qrcode"
                type="font-awesome"
                color="#fff"
                size={70}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
              Login
            </Text>
            <TouchableOpacity
              onPress={() => setShowLogin(!showLogin)}
              style={{
                // borderWidth: 2,
                padding: 10,
                // borderColor: '#222',
                borderRadius: 25,
                marginBottom: 20,
                marginVertical: 30,
              }}
            >
              <Icon
                containerStyle={{ backgroundColor: '#111' }}
                name="envelope"
                type="font-awesome"
                color="#fff"
                size={70}
              />
            </TouchableOpacity>
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
                size="large"
                color="#bd69db"
                // textContent={'Loading...'}
                textStyle={{ color: 'white', fontSize: 25 }}
              />
            </View>
          </>
        )} */}
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
            // autoFocus={true}
            placeholderTextColor="white"
            placeholder="Enter your email address"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 20, fontSize: 16 }}>
            Password
          </Text>
          <View style={[styles.input, { flexDirection: 'row' }]}>
            <TextInput
              style={[styles.input1, { flex: 1 }]}
              keyboardType="default"
              value={password}
              onSubmitEditing={signIn}
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
        <View>
          <TouchableOpacity
            onPress={signIn}
            disabled={
              email.length === 0 || password.length === 0 ? true : false
            }
          >
            <LinearGradient
              start={[0, 0.5]}
              end={[1, 0.5]}
              colors={['#bd69db', '#d55bad']}
              style={{ borderRadius: 25 }}
            >
              <View style={styles.circleGradient}>
                <Text style={styles.visit}>Login</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'center',
          }}
        >
          <Text style={styles.text}>Foreget Password</Text>
          <TouchableOpacity onPress={() => navigation.navigate('reset')}>
            <Text style={styles.text2}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.signUp}>
          <Text style={styles.text}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.signUp}>
          <Text style={styles.text}>First Day in BlwUCC</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* {showLogin && (
          <>
            <View style={{ marginBottom: 25 }}>
              <Text style={{ color: 'white', paddingBottom: 20, fontSize: 16 }}>
                Email Address
              </Text>
              <TextInput
                style={styles.input}
                value={email}
                // autoFocus={true}
                placeholderTextColor="white"
                placeholder="Enter your email address"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={{ marginBottom: 25 }}>
              <Text style={{ color: 'white', paddingBottom: 20, fontSize: 16 }}>
                Password
              </Text>
              <View style={[styles.input, { flexDirection: 'row' }]}>
                <TextInput
                  style={[styles.input1, { flex: 1 }]}
                  keyboardType="default"
                  value={password}
                  onSubmitEditing={signIn}
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
            <View>
              <TouchableOpacity
                onPress={signIn}
                disabled={
                  email.length === 0 || password.length === 0 ? true : false
                }
              >
                <LinearGradient
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={['#bd69db', '#d55bad']}
                  style={{ borderRadius: 25 }}
                >
                  <View style={styles.circleGradient}>
                    <Text style={styles.visit}>Login</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'center',
              }}
            >
              <Text style={styles.text}>Foreget Password</Text>
              <TouchableOpacity onPress={() => navigation.navigate('reset')}>
                <Text style={styles.text2}>Reset Password</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signUp}>
              <Text style={styles.text}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={styles.text2}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )} */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  logo: {
    height: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCustom1: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  iconCustom2: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
    color: '#FFF',
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
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 25,
  },
  text: { color: '#888', marginHorizontal: 10, fontSize: 15 },
  text2: { color: '#ffff', fontWeight: '900' },
  loginContainer: { marginVertical: 30 },
  logInWith: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: '900',
    fontSize: 20,
  },
});
