import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

import { userCache, cleanUp } from './app/redux/features/auth/userCacheSlice';
// import { persistor, store } from './app/redux/app/configStore';
import SignUpScreen from './app/screens/SignUpScreen';
import LoginScreen from './app/screens/LoginScreen';
import firebase from './app/firebase/Firebase';
import SettingsScreen from './app/screens/SettingsScreen';
import ResourceScreen from './app/screens/ResourceScreen';
import MembersScreen from './app/screens/MembersScreen';
import SideDrawer from './app/components/SideDrawer';
import GivingScreen from './app/screens/GivingScreen';
import SoulWiningScreen from './app/screens/SoulWiningScreen';
import AskPastorQuestionScreen from './app/screens/AskPastorQuestionScreen';
import NotificationScreen from './app/screens/NotificationScreen';
import ResetPasswordScreen from './app/screens/ResetPasswordScreen';
import Home from './app/screens/Home';
import { Icon } from 'react-native-elements';
import UserDashboardScreen from './app/screens/UserDashboardScreen';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { db } from './Firebase/firebase';

let messages;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Drawer = createDrawerNavigator();

export default function AppWrapper() {
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [questions, setQuestions] = React.useState([]);
  const [isSignedIn, setIsSignedIn] = React.useState('');
  const dispatch = useDispatch();
  const userobject = useSelector((state) => state.authentication.auth);

  React.useLayoutEffect(() => {
    // if (Platform.os === 'android' || Platform.os === 'ios') {
    LogBox.ignoreLogs(['Setting a timer']);
    // }
    // userObject();
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsSignedIn(true);
        dispatch(userCache(authUser));
      } else {
        setIsSignedIn(false);
        dispatch(cleanUp());
      }
    });
    return unsubscribe;
  }, []);

  React.useLayoutEffect(() => {
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
  }, []);

  React.useEffect(() => {
    async function getQuestion() {
      const messages = questions[0];
      await schedulePushNotification(messages.data.Question);
    }

    getQuestion();
  }, [questions]);

  React.useEffect(() => {
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

  let screens;

  userobject?.email
    ? (screens = (
        <>
          <Drawer.Screen
            name="user"
            options={{
              title: 'Dashboard',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="address-card-o"
                  size={30}
                  color={color}
                />
              ),
            }}
            component={UserDashboardScreen}
          />
          <Drawer.Screen
            options={{
              title: 'settings',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="wrench"
                  size={30}
                  color={color}
                />
              ),
            }}
            name="settings"
            component={SettingsScreen}
          />
          {/* <Drawer.Screen
            options={{
              title: 'qrcode',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="shopping-basket"
                  size={30}
                  color={color}
                />
              ),
            }}
            name="qrcode"
            component={QRCodeScanner}
          /> */}
          {/* <Drawer.Screen
            options={{
              title: 'Resources',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="shopping-basket"
                  size={30}
                  color={color}
                />
              ),
            }}
            name="resources"
            component={ResourceScreen}
          /> */}
          <Drawer.Screen
            options={{
              title: 'Members',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="users"
                  size={30}
                  color={color}
                />
              ),
            }}
            name="members"
            component={MembersScreen}
          />
          <Drawer.Screen
            options={{
              title: 'Giving',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="credit-card"
                  size={30}
                  color={color}
                />
              ),
            }}
            name="giving"
            component={GivingScreen}
          />
          <Drawer.Screen
            options={{
              title: 'Soul winning',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="user-plus"
                  size={30}
                  color={color}
                />
              ),
            }}
            name="soulwining"
            component={SoulWiningScreen}
          />
          <Drawer.Screen
            options={{
              title: 'Ask Pastor',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="question-circle"
                  size={30}
                  color={color}
                />
              ),
            }}
            name="askpastor"
            component={AskPastorQuestionScreen}
          />
          <Drawer.Screen
            options={{
              title: 'Notification',
              drawerIcon: ({ color }) => (
                <Icon type="font-awesome" name="bell" size={30} color={color} />
              ),
            }}
            name="notification"
            component={NotificationScreen}
          />
        </>
      ))
    : (screens = (
        <>
          <Drawer.Screen name="home" component={Home} />
          <Drawer.Screen name="login" component={LoginScreen} />
          <Drawer.Screen name="signup" component={SignUpScreen} />
          <Drawer.Screen name="reset" component={ResetPasswordScreen} />
        </>
      ));
  return (
    <>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <Drawer.Navigator
          drawerStyle={{
            backgroundColor: '#111f6c',
            width: '78%',
          }}
          drawerContent={(props) => <SideDrawer {...props} />}
        >
          {screens}
        </Drawer.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
    </>
  );
}

async function schedulePushNotification(message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got a message! 📬",
      body: message,
      data: { data: 'goes here' },
      sound: 'pristine-609.mp3',
    },
    trigger: { seconds: 4 },
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

  Notifications.setNotificationChannelAsync('BLWUCC', {
    name: 'BLWUCC',
    sound: 'pristine-609.mp3',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });

  return token;
}
