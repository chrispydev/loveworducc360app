import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { useFonts } from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from '../firebase/Firebase';
import { auth, db } from '../../firebase/firebase';
import { Icon } from 'react-native-elements';

export default function GivingScreen({ navigation }) {
  const [amount, setAmount] = useState(0);

  // const users = useRef([]);
  const [givingName, setGivingName] = useState([]);
  const [selectedGiving, setSelectedGiving] = useState('');
  const [selectedMembers, setSelectedMembers] = useState('');
  const show = useRef([]);

  useEffect(() => {
    const unsubscribe = db.collection('profile').onSnapshot((snapshot) =>
      setGivingName(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  // console.log(givingName);

  const [loaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  function addGiving() {
    show.current = true;
    firebase
      .firestore()
      .collection(selectedGiving)
      .add({
        full_name: `${selectedMembers}`,
        giving: `${amount}`,
      })
      .then((docRef) => {
        show.current = false;
        alert('Document successfully added');
        setSelectedMembers('');
        setAmount('');
        setSelectedGiving('');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={{ flexDirection: 'row' }}>
          <View>
            <TouchableOpacity>
              <Icon
                onPress={() => navigation.openDrawer()}
                type="font-awesome-5"
                name="bars"
                size={30}
                color="white"
                iconStyle={styles.icon1}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.welcome, { flex: 1 }]}>
            <Text style={styles.welcomeText}>Givings</Text>
          </View>
        </View>
        {show.current === true && (
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
                visible={show.current}
                textContent={'Loading...'}
                textStyle={{ color: 'white', fontSize: 20 }}
              />
            </View>
          </>
        )}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Names of Giver
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
              selectedValue={selectedMembers}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedMembers(itemValue)
              }
            >
              <Picker.Item
                label="Select Giver's Name"
                value="Select Giver's Name"
              />
              {givingName?.map((user, index) => (
                <Picker.Item label={`${user.id}`} value={`${user.id}`} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Amount
          </Text>
          <TextInput
            style={styles.input}
            // autoFocus={true}
            placeholderTextColor="white"
            value={amount}
            placeholder="Enter amount"
            onChangeText={(amount) => setAmount(amount)}
          />
        </View>

        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: 'white', paddingBottom: 10, fontSize: 16 }}>
            Giving Type
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
              selectedValue={selectedGiving}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedGiving(itemValue)
              }
            >
              <Picker.Item label="Select Type" value="Select Type" />
              <Picker.Item label="Partnership" value="Partnership" />
              <Picker.Item label="Tithe" value="Tithe" />
            </Picker>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={addGiving}
            disabled={
              amount.length === 0 ||
              selectedMembers.length === 0 ||
              selectedGiving.length === 0
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
                <Text style={styles.visit}>Add</Text>
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
