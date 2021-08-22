import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  RefreshControl,
} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

import Header from '../components/Header';
import PieCharts from '../components/PieChats';
import ServiceInfo from '../components/ServiceInfo';
import { auth, db } from '../../Firebase/firebase';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const UserAdminDashboradScreen = ({ navigation, route }) => {
  const [partnerships, setPartnerships] = useState([]);
  const amount = useRef([]);
  const curretAmount = useRef([]);
  // tithes state
  const [tithes, setTithes] = useState([]);
  const amountithe = useRef([]);
  const currettithe = useRef([]);

  // setAttended
  const [sundayService, setSundayService] = useState([]);
  let sunday_service = useRef();
  // setAttended
  const [sunday21Service, setSunday21Service] = useState([]);
  let sunday21_service = useRef();
  const [midWeekService, setMidWeekService] = useState([]);
  let midweek_service = useRef();

  // soul
  const [soulsWon, setSoulsWon] = useState([]);
  let souls = useRef();

  // refresh
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const currentUser = auth.currentUser;

  // currentUser.updateProfile({
  //   photoURL:
  //     'https://firebasestorage.googleapis.com/v0/b/blwuccapp-56e5f.appspot.com/o/images%2F2021-08-15T06%3A20%3A09.490Z?alt=media&token=4bbaf7cd-d4ca-446c-a0ee-677cd20d3174',
  // });

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

    if (soulsWon.length == 0) {
      db.collection('soulswon').onSnapshot((snapshot) =>
        setSoulsWon(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    }
    return () => {
      unsubscribePartnership;
    };
  }, [route]);

  useEffect(() => {
    const unsubscribe = db.collection('SundayService').onSnapshot((snapshot) =>
      setSundayService(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    const unsubscribe1 = db
      .collection('Sunday21Service')
      .onSnapshot((snapshot) =>
        setSunday21Service(
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
    const unsubscribeTithe = db.collection('Tithe').onSnapshot((snapshot) =>
      setTithes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribeTithe;
    };
  }, [route]);

  useEffect(() => {
    db.collection('soulswon').onSnapshot((snapshot) =>
      setSoulsWon(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [route]);

  useEffect(() => {
    const serviceAttended = soulsWon.filter(({ id, data }) => {
      if (data.won_by === auth.currentUser?.email) {
        return true;
      }
    });
    // console.log(auth.currentUser?.photoURL);
    // console.log(serviceAttended);
    souls.current = serviceAttended.length;
  }, [soulsWon]);

  useEffect(() => {
    const serviceAttended = sundayService.filter(({ id, data }) => {
      if (data.email === auth.currentUser?.email) {
        return true;
      }
    });
    // console.log(serviceAttended);
    sunday_service.current = serviceAttended.length;
  }, [sundayService]);

  useEffect(() => {
    const serviceAttended = sundayService.filter(({ id, data }) => {
      if (data.email === auth.currentUser?.email) {
        return true;
      }
    });
    // console.log(serviceAttended);
    sunday21_service.current = serviceAttended.length;
  }, [sunday21Service]);

  useEffect(() => {
    const serviceAttended = midWeekService.filter(({ id, data }) => {
      if (data.email === auth.currentUser?.email) {
        return true;
      }
    });
    // console.log(serviceAttended);
    midweek_service.current = serviceAttended.length;
  }, [midWeekService]);

  useEffect(() => {
    const user = auth.currentUser?.displayName;
    amount.current = partnerships?.filter((partner) => {
      if (partner.data.full_name === user) {
        return true;
      }
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let current = [];
    amount.current?.map((money) => current.push(parseFloat(money.data.giving)));
    curretAmount.current = current.reduce(reducer, 0);
    // console.log(curretAmount.current);
  }, [partnerships]);

  useEffect(() => {
    const user = auth.currentUser?.displayName;
    amountithe.current = tithes?.filter((partner) => {
      if (partner.data.full_name === user) {
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="auto" />
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
            number={sunday_service?.current + sunday21_service.current || 0}
            text="Sunday Services "
            icon="users"
          />
          {/* <ServiceInfo number={0} text="Sunday Service Missed" icon="plus" /> */}
          <ServiceInfo
            number={midweek_service?.current || 0}
            text="Midweek service Attended"
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
          <ServiceInfo
            number={souls.current}
            text="Total Soul Won"
            icon="users"
          />
        </View>
        {/* <PieCharts /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAdminDashboradScreen;
