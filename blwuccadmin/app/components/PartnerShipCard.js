import React from 'react';
import { View, Text } from 'react-native';

export default function PartnerShipCard() {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        paddingRight: 20,
        flexGrow: 0.5,
        margin: 10,
      }}
    >
      <View
        style={{
          backgroundColor: '#555',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 35,
          paddingHorizontal: 20,
          borderRadius: 25,
        }}
      >
        <Text style={{ color: '#fff' }}>This is mister ki</Text>
      </View>
    </View>
  );
}
