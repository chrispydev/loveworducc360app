import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const ServiceInfo = ({ number, text, icon }) => {
  return (
    <View style={styles.data}>
      <View style={styles.dataItem}>
        <View>
          <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold' }}>
            {number}
          </Text>
          <Text style={{ color: 'white' }}>{text}</Text>
        </View>
        <Icon size={30} type="font-awesome" name={icon} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  data: {
    flex: 1,
    width: '100%',
    paddingRight: 20,
    flexGrow: 0.5,
    margin: 10,
  },
  dataItem: {
    backgroundColor: '#fdc100',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
});

export default ServiceInfo;
