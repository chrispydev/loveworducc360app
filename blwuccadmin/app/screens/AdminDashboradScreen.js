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
import { Picker } from 'react-native';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AdminDashboradScreen = ({ navigation, route }) => {
  // Sunday Service
  const [sundayService, setSundayService] = useState([]);
  let sunday_service = useRef([]);

  // Midweek Service
  const [midWeekService, setMidWeekService] = useState([]);
  let midweek_service = useRef();

  // friday Service
  const [fridayPrayerServices, setFridayPrayerServices] = useState([]);
  let friday_service = useRef();

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
    const unsubscribe = db.collection('sundayservices').onSnapshot((snapshot) =>
      setSundayService(
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
    return () => {
      unsubscribe;
    };
  }, [route]);

  useEffect(() => {
    const unsubscribe = db
      .collection('midweekservices')
      .onSnapshot((snapshot) =>
        setMidWeekService(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    if (sundayService.length === 0) {
      db.collection('sundayservices').onSnapshot((snapshot) =>
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
    db.collection('fridayprayerservices').onSnapshot((snapshot) =>
      setFridayPrayerServices(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [navigation]);

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
    let sunday_dates = [];
    let sunday_duplicate = [];
    let serviceAttended = [];
    sundayService.map((attend) => sunday_dates.push(attend.data.timestamp));

    sunday_dates.forEach((item) => {
      if (!sunday_duplicate.includes(item)) {
        sunday_duplicate.push(item);
      }
    });

    serviceAttended = sundayService.filter(({ id, data }) => {
      if (data.timestamp === sunday_duplicate[0]) {
        return true;
      }
    });
    sunday_service.current = serviceAttended.length;
  }, [sundayService]);

  useEffect(() => {
    let sunday_dates = [];
    let sunday_duplicate = [];
    let serviceAttended = [];
    midWeekService.map((attend) => sunday_dates.push(attend.data.timestamp));

    sunday_dates.forEach((item) => {
      if (!sunday_duplicate.includes(item)) {
        sunday_duplicate.push(item);
      }
    });

    serviceAttended = midWeekService.filter(({ id, data }) => {
      if (data.timestamp === sunday_duplicate[0]) {
        return true;
      }
    });
    midweek_service.current = serviceAttended.length;
  }, [midWeekService]);

  useEffect(() => {
    let sunday_dates = [];
    let sunday_duplicate = [];
    let serviceAttended = [];
    fridayPrayerServices.map((attend) =>
      sunday_dates.push(attend.data.timestamp)
    );

    sunday_dates.forEach((item) => {
      if (!sunday_duplicate.includes(item)) {
        sunday_duplicate.push(item);
      }
    });

    serviceAttended = fridayPrayerServices.filter(({ id, data }) => {
      if (data.timestamp === sunday_duplicate[0]) {
        return true;
      }
    });
    friday_service.current = serviceAttended.length;
  }, [fridayPrayerServices]);

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
  // console.log(profile);

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

          <ServiceInfo
            number={midweek_service?.current || 0}
            text="Midweek Services "
            icon="users"
          />
          <ServiceInfo
            number={friday_service?.current || 0}
            text="Friday Prayer Services "
            icon="users"
          />
          <ServiceInfo
            route="soulwining"
            navigation={navigation}
            number={soulsWon.length || 0}
            text="Total Soul Won"
            icon="plus-square"
          />
          <ServiceInfo
            navigation={navigation}
            number={`GHC ${curretAmount.current || 0}`}
            text="Total Partnership"
            icon="credit-card"
          />
          <ServiceInfo
            number={`GHC ${currettithe.current || 0}`}
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
