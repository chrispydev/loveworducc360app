import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import { useFonts } from 'expo-font';
import CarouselSlide from '../components/CarouselSlide';

const Home = ({ navigation }) => {
  const [loaded] = useFonts({
    Pattaya: require('../assets/fonts/Pattaya-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome Admin</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.logo} source={require('../assets/UCCNEW.png')} />
      </View>
      <CarouselSlide navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  welcome: { paddingBottom: 10 },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'Pattaya',
  },
  logo: { height: 200, resizeMode: 'contain' },
});
