import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { View } from 'react-native';

export default function namesCard({ name }) {
  // console.log(name);
  const [show, setShow] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <ListItem
          bottomDivider
          containerStyle={{
            backgroundColor: '#426ccb',
            borderRadius: 25,
            paddingBottom: 25,
          }}
        >
          <ListItem.Content>
            <ListItem.Title style={{ color: '#fff', fontWeight: 'bold' }}>
              Name: {name?.data.full_name}
            </ListItem.Title>
            <ListItem.Subtitle style={{ color: '#fff', fontWeight: 'light' }}>
              Won by: {name?.data.won_by}
            </ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
      {show && (
        <>
          <ListItem
            containerStyle={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              backgroundColor: '#f1f1f1',
              position: 'relative',
              top: -20,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: 'bold' }}>
                {name?.data.email_address}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontWeight: 'bold' }}>
                {name?.data.phone_number}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{ fontWeight: 'bold' }}>
                {name?.data.hall_hostel}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </>
      )}
    </View>
  );
}
