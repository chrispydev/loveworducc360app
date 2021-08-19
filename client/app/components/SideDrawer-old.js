import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { auth } from '../firebase/Firebase';

export default function SideDrawer(props) {
  // const { routes } = useSelector((state) => state.setRoutes);
  function signOut() {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert('Signed-out');
      })
      .catch((error) => {
        console.log(error.message);
        // An error happened.
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <StatusBar style="auto" />

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

        <View style={{ paddingLeft: 40 }}>
          <TouchableOpacity
            style={[
              styles.setContainer,
              routes.name === 'admin' ? styles.current : null,
            ]}
            onPress={() => props.navigation.navigate('admin')}
          >
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: routes.name === 'admin' ? 'black' : 'white',
              }}
              size={30}
              type="font-awesome"
              name="address-card-o"
              color="white"
            />
            <Text
              style={{
                color: routes.name === 'admin' ? 'black' : 'white',
                fontSize: 17,
              }}
            >
              Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.setContainer,
              routes.name === 'settings' ? styles.current : null,
            ]}
            onPress={() => props.navigation.navigate('settings')}
          >
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: routes.name === 'settings' ? 'black' : 'white',
              }}
              size={30}
              type="font-awesome"
              name="wrench"
              color="white"
            />
            <Text
              style={{
                color: routes.name === 'settings' ? 'black' : 'white',
                fontSize: 17,
              }}
            >
              settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.setContainer,
              routes.name === 'resources' ? styles.current : null,
            ]}
            onPress={() => props.navigation.navigate('resources')}
          >
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: routes.name === 'resources' ? 'black' : 'white',
              }}
              size={30}
              type="font-awesome"
              name="shopping-basket"
              color="white"
            />
            <Text
              style={{
                color: routes.name === 'resources' ? 'black' : 'white',
                fontSize: 17,
              }}
            >
              Resources
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.setContainer]}>
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: 'white',
              }}
              size={30}
              type="font-awesome"
              name="users"
              color="white"
            />
            <Text style={{ color: 'white', fontSize: 17 }}>Members</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.setContainer]}>
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: 'white',
              }}
              size={30}
              type="font-awesome"
              name="credit-card"
              color="white"
            />
            <Text style={{ color: 'white', fontSize: 17 }}>Givings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.setContainer]}>
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: 'white',
              }}
              size={30}
              type="font-awesome"
              name="user-plus"
              color="white"
            />
            <Text style={{ color: 'white', fontSize: 17 }}>Soul winning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.setContainer]}>
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: 'white',
              }}
              size={30}
              type="font-awesome"
              name="question-circle"
              color="white"
            />
            <Text style={{ color: 'white', fontSize: 17 }}>Ask Pastor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.setContainer]}>
            <Icon
              iconStyle={{
                paddingRight: 20,
                color: 'white',
              }}
              size={30}
              type="font-awesome"
              name="bell"
              color="white"
            />
            <Text style={{ color: 'white', fontSize: 17 }}>Notification</Text>
          </TouchableOpacity>
        </View>
        {/* ))} */}
      </DrawerContentScrollView>
      <DrawerItem
        onPress={() => signOut()}
        style={styles.bottomSign}
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
  );
}

const styles = StyleSheet.create({
  sideDrawerContainer: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 70,
  },
  drawerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  styledIcon: {
    marginRight: 30,
    padding: 10,
  },
  setContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    marginLeft: 20,
    alignItems: 'center',
  },
  current: {
    backgroundColor: 'yellow',
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    marginLeft: 0,
    padding: 18,
  },
  signOut: {
    marginBottom: 15,
    borderColor: '#ddd',
    borderTopWidth: 10,
  },
});
