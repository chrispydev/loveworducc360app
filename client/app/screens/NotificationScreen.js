import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import NoficationCard from '../components/NoficationCard';
import { Icon } from 'react-native-elements';
import { auth, db } from '../../Firebase/firebase';
import { StyleSheet, RefreshControl } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

let messages;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function NotificationScreen({ navigation, route }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [questions, setQuestions] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showText, setshowText] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useLayoutEffect(() => {
    db.collection('messagefrompastor')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setQuestions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    setTimeout(() => {
      if (questions?.length == 0) {
        setShowLoader(false);
        setshowText(true);
      }
    }, 8000);
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // useEffect(() => {
  //   async function getQuestion() {
  //     const messages = questions[0];
  //     await schedulePushNotification(messages.data.Question);
  //   }
  //   getQuestion();
  // }, [questions]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="height">
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <StatusBar style="auto" />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ margin: 10 }}>
              <TouchableOpacity>
                <Icon
                  onPress={() => navigation.openDrawer()}
                  type="font-awesome-5"
                  name="bars"
                  size={30}
                  iconStyle={styles.icon1}
                />
              </TouchableOpacity>
            </View>
            {questions?.length === 0 ? (
              <>
                <>
                  <View>
                    <Spinner
                      visible={showLoader}
                      color="#bd69db"
                      // textContent={'Loading...'}
                      textStyle={{ color: '#fff', fontSize: 25 }}
                    />
                    {showText && (
                      <>
                        <Text style={{ position: 'absolute', top: '50%' }}>
                          Pull down the text to Refresh the app
                        </Text>
                      </>
                    )}
                  </View>
                </>
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                {questions.map((question, index) => (
                  <>
                    <NoficationCard
                      key={index}
                      from={question.data.From}
                      question={question.data.Question}
                    />
                  </>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  icon1: {
    color: '#444',
    padding: 10,
  },
});

async function schedulePushNotification(message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got a message! 📬",
      body: message,
      data: { data: 'goes here' },
      sound: 'pristine-609.mp3',
    },
    trigger: { seconds: 8 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('BLWUCC', {
      name: 'BLWUCC',
      sound: 'pristine-609.mp3',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
