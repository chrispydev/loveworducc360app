import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import firebase from '../firebase/Firebase';

export default function SideDrawer1(props) {
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
    props.navigation.closeDrawer();
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Icon
            iconStyle={{ padding: 10 }}
            size={30}
            type="font-awesome"
            name="certificate"
            color="white"
          />
          <Text style={styles.drawerText}>Loveworld UCC</Text>
          <TouchableOpacity>
            <Icon
              onPress={() => props.navigation.closeDrawer()}
              iconStyle={{ padding: 10 }}
              size={30}
              type="font-awesome"
              name="times"
              color="white"
            />
          </TouchableOpacity>
        </View>
        {/* <View>
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
              // marginVertical: 30,
            }}
          >
            <Icon
              // containerStyle={{ backgroundColor: '#111' }}
              name="qrcode"
              type="font-awesome"
              color="#fff"
              size={70}
            />
          </TouchableOpacity>
        </View> */}
        <View style={{ marginLeft: 40 }}>
          <DrawerItemList
            {...props}
            activeTintColor="black"
            inactiveTintColor="white"
            activeBackgroundColor="#fdc111"
            labelStyle={{ fontSize: 20 }}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        <DrawerItem
          onPress={() => signOut()}
          icon={({ color = '#fff', size }) => (
            <Icon
              iconStyle={{ padding: 10, color: '#fff' }}
              size={30}
              type="material-icon"
              name="exit-to-app"
              color={color}
            />
          )}
          label="Sign Out"
          labelStyle={{ color: '#fff', fontSize: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 70,
    // marginRight: 100,
  },
  drawerText: {
    color: 'white',
    fontSize: RFValue(16, 375),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottom: {
    // alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
