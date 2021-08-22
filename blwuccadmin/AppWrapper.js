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
import AdminDashboradScreen from './app/screens/AdminDashboradScreen';
import firebase from './app/firebase/Firebase';
import SettingsScreen from './app/screens/SettingsScreen';
import ResourceScreen from './app/screens/ResourceScreen';
import MembersScreen from './app/screens/MembersScreen';
import SideDrawer from './app/components/SideDrawer';
import GivingScreen from './app/screens/GivingScreen';
import SoulWiningScreen from './app/screens/SoulWiningScreen';
import AskPastorQuestionScreen from './app/screens/AskPastorQuestionAskPastorQuestionScreen';
import NotificationScreen from './app/screens/NotificationScreen';
import Home from './app/screens/Home';
import { Icon } from 'react-native-elements';
import ResetPasswordScreen from './app/screens/ResetPasswordScreen';

const Drawer = createDrawerNavigator();

export default function AppWrapper() {
  const [isSignedIn, setIsSignedIn] = React.useState('');
  const dispatch = useDispatch();
  const userobject = useSelector((state) => state.authentication.auth);

  React.useLayoutEffect(() => {
    if (Platform.os === 'android' || Platform.os === 'ios') {
      LogBox.ignoreLogs(['Setting a timer']);
    }
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
  let screens;

  userobject?.email
    ? (screens = (
        <>
          <Drawer.Screen
            name="admin"
            options={{
              title: 'Admin Dashboard',
              drawerIcon: ({ color }) => (
                <Icon
                  type="font-awesome"
                  name="address-card-o"
                  size={30}
                  color={color}
                />
              ),
            }}
            component={AdminDashboradScreen}
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
          <Drawer.Screen
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
          />
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
          {/* <Drawer.Screen
            options={{
              title: 'Souls Won',
              drawerIcon: ({ color }) => (
                <Icon type="font-awesome" name="bell" size={30} color={color} />
              ),
            }}
            name="soul"
            component={SoulWonScreen}
          /> */}
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
