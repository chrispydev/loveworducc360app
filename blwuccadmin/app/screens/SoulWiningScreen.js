import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import AccordionListItem from '../components/AccordionList';
import firebase from '../firebase/Firebase';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SoulsCard from '../components/SoulsCard';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SoulWiningScreen({ navigation }) {
  const [name, setSoulsWon] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showText, setshowText] = useState(false);
  const showSpinner = useRef(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection('soulswon')
      .onSnapshot((snapshot) =>
        setSoulsWon(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    unShowSpinner();
  }, [navigation]);
  // console.log(name);

  function unShowSpinner() {
    setTimeout(() => {
      if (name?.length == 0) {
        showSpinner.current = false;
        setshowText(true);
      }
    }, 8000);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 20, marginHorizontal: 10 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              position: 'relative',
              left: '-40%',
              top: '0%',
              marginBottom: 10,
            }}
          >
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
              alignContent: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 30, textAlign: 'center' }}>Souls Won</Text>
          </View>
          <View>
            <View style={{ flex: 1 }}>
              {name?.length === 0 ? (
                <>
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
                  </View>
                </>
              ) : (
                <View>
                  {name?.map((name, index) => (
                    <>
                      <SoulsCard key={index} name={name} />
                    </>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
