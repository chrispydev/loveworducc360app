import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon, Input, Avatar } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { auth, db } from '../../firebase/firebase';
// import firebase from '../firebase/Firebase';

const Header = ({ navigation }) => {
  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const unsubcribe = setInterval(() => {
      setProfileName(auth.currentUser?.displayName);
      setProfileImage(auth.currentUser?.photoURL);
    }, 2000);
    return () => {
      unsubcribe;
    };
  }, [navigation]);

  const updateProfile = () => {
    setProfileName(auth.currentUser?.displayName);
    setProfileImage(auth.currentUser?.photoURL);
  };

  return (
    <View style={styles.headerMain}>
      <View style={styles.content1}>
        <TouchableOpacity>
          <Icon
            onPress={() => navigation.openDrawer()}
            type="font-awesome-5"
            name="bars"
            size={30}
            iconStyle={styles.icon1}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Dashboard</Text>
      </View>

      <View style={styles.avatarcontainer}>
        <TouchableOpacity onPress={updateProfile}>
          <Avatar
            rounded
            size="medium"
            source={{ uri: profileImage }}
            containerStyle={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            {profileName}
          </Text>
          {/* <Text style={{ fontSize: 13, color: '#444' }}>Super Admin</Text> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1: { color: '#444' },
  text: {
    fontWeight: '900',
    marginHorizontal: 10,
    fontSize: RFValue(20, 580),
    color: '#444',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 6,
    fontSize: 30,
  },
  icon: {
    paddingHorizontal: 10,
    transform: [{ rotate: '90deg' }],
    color: '#444',
  },
  avatarcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Header;
