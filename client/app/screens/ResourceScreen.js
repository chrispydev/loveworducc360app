import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';

import { useDispatch } from 'react-redux';

import firebase from '../firebase/Firebase';

export default function ResourceScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        navigation.navigate('login');
      }
    });
    return () => {
      unsubscribe;
    };
  }, []);
  return (
    <SafeAreaView style={{ marginHorizontal: 10 }}>
      <StatusBar style="auto" />
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Button
          buttonStyle={{ borderRadius: 25 }}
          title="Download Note"
          type="solid"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button
          buttonStyle={{ borderRadius: 25 }}
          title="Download message for the week"
          type="solid"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button
          buttonStyle={{ borderRadius: 25 }}
          title="Ministry materials"
          type="solid"
        />
      </View>
    </SafeAreaView>
  );
}
