import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

export default function NoficationCard({ from, question }) {
  return (
    <View
      style={{
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Card>
        <View>
          <Text>{question}</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
