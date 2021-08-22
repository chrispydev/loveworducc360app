import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useFonts } from 'expo-font';
import firebase from '../firebase/Firebase';
import Spinner from 'react-native-loading-spinner-overlay';

export default function AskPastorQuestionScreen({ navigation }) {
  const [show, setShow] = useState(false);
  const [askPastor, setAskPastor] = useState('');

  const [loaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  function askPastorQuestion() {
    const user = firebase.auth().currentUser;
    setShow(true);
    firebase
      .firestore()
      .collection('askpastor')
      .add({
        From: user.displayName,
        Question: askPastor,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setShow(false);
        setAskPastor('');
        alert('Question Sent successfully!');
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <KeyboardAvoidingView behavior="height" style={[styles.container]}>
      <SafeAreaView style={{ margin: 10 }}>
        <ScrollView>
          <StatusBar style="auto" />
          <View style={{ flexDirection: 'row', marginBottom: 30 }}>
            <View style={{ marginTop: 15 }}>
              <TouchableOpacity>
                <Icon
                  onPress={() => navigation.openDrawer()}
                  type="font-awesome-5"
                  name="bars"
                  size={30}
                  iconStyle={styles.icon1}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.welcome, { flex: 1 }]}>
              <Text style={styles.welcomeText}>Ask Pastor</Text>
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
                  textStyle={{ color: 'white', fontSize: 25 }}
                />
              </View>
            </>
          )}
          <TextInput
            value={askPastor}
            onChangeText={(askPastor) => setAskPastor(askPastor)}
            style={styles.askPastorStyle}
            editable
            placeholder="Type your question here"
            onSubmitEditing={askPastorQuestion}
            placeholderTextColor="#fff"
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Button
              disabled={askPastor.length === 0 ? true : false}
              onPress={askPastorQuestion}
              title="send"
              type="solid"
              containerStyle={{ width: '50%', borderRadius: 25 }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
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
  welcome: { marginBottom: 10 },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'Pattaya',
  },
  askPastorStyle: {
    borderWidth: 1,
    borderColor: '#555',
    marginTop: 10,
    padding: 10,
    height: 120,
    marginBottom: 15,
    borderRadius: 10,
    color: '#fff',
  },
});
