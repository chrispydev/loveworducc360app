import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  RefreshControl,
} from 'react-native';

import Header from '../components/Header';
import PartnerShipCard from '../components/PartnerShipCard';
import PieCharts from '../components/PieChats';
import ServiceInfo from '../components/ServiceInfo';
import SoulsCard from '../components/SoulsCard';
import firebase from '../firebase/Firebase';
import { auth, db } from '../../firebase/firebase';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AdminDashboradScreen = ({ navigation, route }) => {
  // setAttended
  const [sundayService, setSundayService] = useState([]);
  let sunday_service = useRef();
  const [midWeekService, setMidWeekService] = useState([]);
  let midweek_service = useRef();
  const [profile, setProfile] = useState([]);
  const [soulsWon, setSoulsWon] = useState([]);
  // partnership
  const [partnerships, setPartnerships] = useState([]);
  const amount = useRef([]);
  const curretAmount = useRef([]);
  // tithe
  const [tithes, setTithes] = useState([]);
  const amountithe = useRef([]);
  const currettithe = useRef([]);

  // refresh
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useLayoutEffect(() => {
    db.collection('profile').onSnapshot((snapshot) =>
      setProfile(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    db.collection('soulswon').onSnapshot((snapshot) =>
      setSoulsWon(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

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

  useEffect(() => {
    const unsubscribe = db.collection('SundayService').onSnapshot((snapshot) =>
      setSundayService(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    if (midWeekService)
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
    return () => {
      unsubscribe;
    };
  }, [route]);

  useEffect(() => {
    const unsubscribe = db
      .collection('WednesdayService')
      .onSnapshot((snapshot) =>
        setMidWeekService(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    if (sundayService.length === 0) {
      db.collection('SundayService').onSnapshot((snapshot) =>
        setSundayService(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    }

    return () => {
      unsubscribe;
    };
  }, [route]);

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
    const serviceAttended = sundayService.map(({ id, data }) => {
      data;
    });
    // console.log(serviceAttended);
    sunday_service.current = serviceAttended.length;
  }, [sundayService]);

  useEffect(() => {
    const serviceAttended = midWeekService.map(({ id, data }) => {
      data;
    });
    // console.log(serviceAttended);
    midweek_service.current = serviceAttended.length;
  }, [midWeekService]);

  useEffect(() => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let allGiving = partnerships?.map((partnership) =>
      parseFloat(partnership.data.giving)
    );
    curretAmount.current = allGiving.reduce(reducer, 0);
    // console.log(curretAmount.current);
  }, [partnerships]);

  useEffect(() => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let allGiving = tithes?.map((partnership) =>
      parseFloat(partnership.data.giving)
    );
    currettithe.current = allGiving.reduce(reducer, 0);
  }, [tithes]);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="auto" />
        <View>
          <View style={{ flex: 1 }}>
            <Header navigation={navigation} />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginTop: 20,
          }}
        >
          <ServiceInfo
            number={profile.length}
            text="Total members"
            icon="users"
          />
          <ServiceInfo
            number={sunday_service?.current || 0}
            text="Sunday Services "
            icon="users"
          />
          {/* <ServiceInfo number={0} text="Sunday Service Missed" icon="plus" /> */}
          <ServiceInfo
            number={midweek_service?.current || 0}
            text="Midweek service Attended"
            icon="minus-square"
          />
          {/* <ServiceInfo
            number={0}
            text="Midweek service missed"
            icon="minus-square"
          /> */}

          <ServiceInfo
            route="soulwining"
            navigation={navigation}
            number={soulsWon.length}
            text="Total Soul Won"
            icon="plus-square"
          />

          <ServiceInfo
            navigation={navigation}
            number={`GHC ${curretAmount.current}`}
            text="Total Partnership"
            icon="credit-card"
          />

          <ServiceInfo
            number={`GHC ${currettithe.current}`}
            text="Total Tithe"
            icon="credit-card"
          />
        </View>
        {/* <PieCharts /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboradScreen;
