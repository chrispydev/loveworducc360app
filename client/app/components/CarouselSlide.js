import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

const ENTRIES1 = [
  {
    illustration: 'https://chrispydev.vercel.app/images/carousel-1.jpg',
  },
  {
    illustration: 'https://chrispydev.vercel.app/images/carousel-2.jpg',
  },
  {
    illustration: 'https://chrispydev.vercel.app/images/carousel-3.jpg',
  },
  {
    illustration: 'https://chrispydev.vercel.app/images/carousel-4.jpg',
  },
];
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CarouselSlide({ navigation }) {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };
  return (
    <View style={{ marginTop: screenHeight * 0.05 }}>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Carousel
          autoplay={true}
          loop={true}
          autoplayInterval={1800}
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
