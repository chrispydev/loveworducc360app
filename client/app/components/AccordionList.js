import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { View } from 'react-native';

const AccordionListItem = ({ user, index }) => {
  const [show, setShow] = useState(false);
 

  return (
    <>
      <View key={index}>
        <TouchableOpacity onPress={() => setShow(!show)}>
          <ListItem
            bottomDivider
            containerStyle={{
              backgroundColor: '#426ccb',
              borderRadius: 25,
              paddingBottom: 25,
            }}
          >
            <Avatar
              rounded
              size="medium"
              source={{
                uri: user?.profileImage,
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ color: '#fff', fontWeight: 'bold' }}>
                {user?.full_name}
              </ListItem.Title>
              {/* <ListItem.Subtitle>subtitle</ListItem.Subtitle> */}
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
                  {user?.email_address}
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontWeight: 'bold' }}>
                  {user?.phone_number}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ fontWeight: 'bold' }}>
                  {user?.hall_Hostel}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ fontWeight: 'bold' }}>
                  {user?.fellowship}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </>
        )}
      </View>
    </>
  );
};
export default AccordionListItem;

const styles = StyleSheet.create({
  bodyBackground: {
    backgroundColor: '#EFEFEF',
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    paddingLeft: '1.5rem',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  bodyContainer: {
    padding: '1rem',
    paddingLeft: '1.5rem',
    position: 'absolute',
    bottom: 0,
  },
});
