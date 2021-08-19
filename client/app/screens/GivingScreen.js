import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import ServiceInfo from '../components/ServiceInfo';
import { auth, db } from '../../Firebase/firebase';
import { Icon } from 'react-native-elements';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function GivingScreen({ navigation, route }) {
  // partnership state
  const [partnerships, setPartnerships] = useState([]);
  const amount = useRef([]);
  const curretAmount = useRef([]);
  // tithes state
  const [tithes, setTithes] = useState([]);
  const amountithe = useRef([]);
  const currettithe = useRef([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    db.collection('Partnership').onSnapshot((snapshot) =>
      setPartnerships(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    if (tithes.length === 0) {
      db.collection('Tithe').onSnapshot((snapshot) =>
        setTithes(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    }
  }, [navigation]);

  if (partnerships.length === 0) {
    db.collection('Partnership').onSnapshot((snapshot) =>
      setPartnerships(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }

  useEffect(() => {
    db.collection('Tithe').onSnapshot((snapshot) =>
      setTithes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [navigation]);

  useEffect(() => {
    amount.current = partnerships?.filter(({ id, data }) => {
      if (data.full_name === auth.currentUser?.displayName) {
        return true;
      }
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let current = [];
    amount.current?.map((money) => current.push(parseFloat(money.data.giving)));
    curretAmount.current = current.reduce(reducer, 0);
  }, [partnerships]);

  useEffect(() => {
    amountithe.current = tithes?.filter(({ id, data }) => {
      if (data.full_name === auth.currentUser?.displayName) {
        return true;
      }
    });
    const reducer1 = (accumulator, currentValue) => accumulator + currentValue;
    let current1 = [];
    amountithe.current?.map((money) =>
      current1.push(parseFloat(money.data.giving))
    );
    currettithe.current = current1.reduce(reducer1, 0);
  }, [tithes]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="auto" />
        <View style={{ flexDirection: 'row', padding: 20 }}>
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
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: 'bold',
                  paddingBottom: 20,
                }}
              >
                Total Giving
              </Text>
            </View>
            <ServiceInfo
              number={`GHC ${curretAmount.current}`}
              text="Total Partnership"
              icon="credit-card"
            />
            <ServiceInfo
              number={`GHC ${currettithe.current}`}
              text="Total Tithe Giving"
              icon="credit-card"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circleGradient: {
    margin: 1,
    height: 42,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
});
