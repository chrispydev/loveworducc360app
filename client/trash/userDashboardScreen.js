import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Text,
} from 'react-native';

import Header from '../components/Header';
import PieCharts from '../components/PieChats';
import ServiceInfo from '../components/ServiceInfo';
import { auth, db } from '../Firebase/firebase';

const UserAdminDashboradScreen = ({ navigation }) => {
  const [partnerships, setPartnerships] = useState([]);
  const amount = useRef([]);
  const curretAmount = useRef([]);
  // tithes state
  const [tithes, setTithes] = useState([]);
  const amountithe = useRef([]);
  const currettithe = useRef([]);

  // setAttended
  const [attended, setAttended] = useState([]);

  useEffect(() => {
    const unsubscribePartnership = db
      .collection('Partnership')
      .onSnapshot((snapshot) =>
        setPartnerships(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return () => {
      unsubscribePartnership;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('attended').onSnapshot((snapshot) =>
      setAttended(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    const unsubscribeTithe = setTimeout(() => {
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
    }, 1800);
    return () => {
      unsubscribeTithe;
    };
  }, []);

  useEffect(() => {
    const user = auth.currentUser?.displayName;
    amount.current = partnerships?.filter(
      (partner) => partner.data.full_name === user
    );
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let current = [];
    amount.current?.map((money) => current.push(parseFloat(money.data.giving)));
    curretAmount.current = current.reduce(reducer, 0);
  }, [partnerships]);

  useEffect(() => {
    const user = auth.currentUser?.displayName;
    amountithe.current = tithes?.filter(
      (partner) => partner.data.full_name === user
    );
    const reducer1 = (accumulator, currentValue) => accumulator + currentValue;
    let current1 = [];
    amountithe.current?.map((money) =>
      current1.push(parseFloat(money.data.giving))
    );
    currettithe.current = current1.reduce(reducer1, 0);
  }, [tithes]);

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View>
          <View style={{ flex: 1 }}>
            <Header navigation={navigation} />
            {/* <Header navigation={navigation} name={name} imageUrl={imageUrl} /> */}
          </View>
        </View>
        <View
          style={{
            // flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginTop: 20,
          }}
        >
          <ServiceInfo
            number={
              attended.data.displayName === auth.currentUser.displayName
                ? attended.data.length
                : null
            }
            text="Sunday Services "
            icon="users"
          />
          <ServiceInfo number={0} text="Sunday Service Missed" icon="plus" />
          <ServiceInfo
            number={13}
            text="Midweek service Attended"
            icon="minus-square"
          />
          <ServiceInfo
            number={0}
            text="Midweek service missed"
            icon="minus-square"
          />
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
          <ServiceInfo number={0} text="Total Soul Won" icon="users" />
        </View>
        <PieCharts />
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserAdminDashboradScreen;
