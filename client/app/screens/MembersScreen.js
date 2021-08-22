import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { View, Text } from 'react-native';
import { db } from '../../Firebase/firebase';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import AccordionListItem from '../components/AccordionList';
import { ScrollView } from 'react-native';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Members({ navigation }) {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showText, setshowText] = useState(false);
  const showSpinner = useRef(true);

  useEffect(() => {
    db.collection('profile').onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    setTimeout(() => {
      if (users?.length == 0) {
        showSpinner.current = false;
        setshowText(true);
      }
    }, 6000);
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flexDirection: 'row' }}>
          {users?.length === 0 ? (
            <>
              <View>
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
              <View
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  // zIndex: 2,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Spinner
                  visible={showSpinner.current}
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
          ) : (
            <>
              <View>
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
              <View style={{ flex: 1, marginLeft: 30, padding: 10 }}>
                {users.map((user, id) => (
                  <>
                    <AccordionListItem id={id} user={user.data} />
                  </>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2rem',
    paddingTop: '5rem',
    justifyContent: 'flex-start',
  },
  icon1: { color: '#444' },
});
