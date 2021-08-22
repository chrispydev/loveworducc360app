import { ListItem, Icon, Button } from 'react-native-elements';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { db, auth } from '../../Firebase/firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';

export default function ProfileInfoCard({ data }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fellowship, setFellowship] = useState('');
  const [name, setName] = useState('');
  const [hallHostel, setHallHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showFellowship, setShowFellowship] = useState(false);
  const [showProfileName, setShowProfileName] = useState(false);
  const [showHallHostel, setShowHallHostel] = useState(false);
  const [showRoomNumber, setShowRoomNumber] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const updatePhone = () => {
    setShow(true);
    db.collection('profile')
      .doc(auth.currentUser.displayName)
      .update({
        phone_number: phone,
      })
      .then((docRef) => {
        setPhone('');
        setShow(false);
        setShowPhone(false);
        alert('Room number Updated');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  };

  const updateEmail = () => {
    setShow(true);
    db.collection('profile')
      .doc(auth.currentUser.displayName)
      .update({
        email_address: email,
      })
      .then((docRef) => {
        auth.currentUser
          .updateEmail(email)
          .then(() => {
            setEmail('');
            setShow(false);
            setShowEmail(false);
            alert('Email address Updated');
          })
          .catch((error) => {
            alert('Error adding document: ', error);
          });
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  };

  const updateName = () => {
    setShow(true);
    db.collection('profile')
      .doc(auth.currentUser.displayName)
      .update({
        full_name: name,
      })
      .then((docRef) => {
        setName('');
        setShow(false);
        setShowProfileName(false);
        alert('Profile name Updated');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  };

  const updateFellow = () => {
    setShow(true);
    db.collection('profile')
      .doc(auth.currentUser.displayName)
      .update({
        fellowship: fellowship,
      })
      .then((docRef) => {
        setFellowship('');
        setShow(false);
        setShowFellowship(false);
        alert('Fellowship Updated');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  };

  const updateHallHostel = () => {
    setShow(true);
    db.collection('profile')
      .doc(auth.currentUser.displayName)
      .update({
        hall_Hostel: hallHostel,
      })
      .then((docRef) => {
        setHallHostel('');
        setShow(false);
        setShowHallHostel(false);
        alert('Fellowship Updated');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  };

  const updateRoomNumber = () => {
    setShow(true);
    db.collection('profile')
      .doc(auth.currentUser.displayName)
      .update({
        room_number: roomNumber,
      })
      .then((docRef) => {
        setRoomNumber('');
        setShow(false);
        setShowRoomNumber(false);
        alert('Room Number Updated');
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  };

  const updatePassword = () => {
    setShow(true);
    auth.currentUser
      .updatePassword(password)
      .then(() => {
        setPassword('');
        setshowPassword(false);
        setShow(true);
        alert('Password set Successfull');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView>
        {show === true && (
          <>
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 2,
                width: '100%',
                height: '100%',
              }}
            >
              <Spinner
                visible={show}
                size="large"
                color="#bd69db"
                // textContent={'Loading...'}
                textStyle={{ color: 'white', fontSize: 25 }}
              />
            </View>
          </>
        )}
        <ListItem bottomDivider>
          <Icon
            type="font-awesome-5"
            name="phone-alt"
            size={20}
            color="black"
          />
          <ListItem.Content>
            <ListItem.Title>{data.phone_number}</ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity onPress={() => setShowPhone(!showPhone)}>
            <Icon type="font-awesome-5" name="edit" size={20} color="black" />
          </TouchableOpacity>
        </ListItem>
        {showPhone && (
          <>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <TextInput
                style={{ flex: 1 }}
                value={phone}
                placeholderTextColor="black"
                placeholder="Enter your phone number"
                onChangeText={(text) => setPhone(text)}
              />
              <Button
                disabled={!phone}
                onPress={updatePhone}
                titleStyle={{ color: '#bd69db' }}
                buttonStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                containerStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                type="outline"
                title="Update"
              />
            </View>
          </>
        )}
        <ListItem bottomDivider>
          <Icon type="font-awesome-5" name="envelope" size={20} color="black" />
          <ListItem.Content>
            <ListItem.Title>{data.email_address}</ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity onPress={() => setShowEmail(!showEmail)}>
            <Icon type="font-awesome-5" name="edit" size={20} color="black" />
          </TouchableOpacity>
        </ListItem>
        {showEmail && (
          <>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <TextInput
                style={{ flex: 1 }}
                value={email}
                placeholderTextColor="black"
                placeholder="Enter your email address"
                onChangeText={(text) => setEmail(text)}
              />
              <Button
                disabled={!email}
                onPress={updateEmail}
                titleStyle={{ color: '#bd69db' }}
                buttonStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                containerStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                type="outline"
                title="Update"
              />
            </View>
          </>
        )}
        <ListItem bottomDivider>
          <Icon type="font-awesome-5" name="users" size={20} color="black" />
          <ListItem.Content>
            <ListItem.Title>{data.fellowship}</ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity onPress={() => setShowFellowship(!showFellowship)}>
            <Icon type="font-awesome-5" name="edit" size={20} color="black" />
          </TouchableOpacity>
        </ListItem>
        {showFellowship && (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderColor: '#555',
                  borderWidth: 1,
                  borderRadius: 25,
                  flex: 1,
                  margin: 5,
                }}
              >
                <Picker
                  style={{ color: 'black' }}
                  dropdownIconColor="black"
                  itemStyle={{ fontSize: 30 }}
                  selectedValue={fellowship}
                  onValueChange={(itemValue, itemIndex) =>
                    setFellowship(itemValue)
                  }
                >
                  <Picker.Item
                    label="Choose your fellowship"
                    value="Choose your fellowship"
                  />
                  <Picker.Item label="Mimshack" value="mimshack" />
                  <Picker.Item label="Ambassadors" value="ambassadors" />
                  <Picker.Item
                    label="loveworld Generals"
                    value="loveworld Generals"
                  />
                  <Picker.Item label="Pleroma " value="pleroma" />
                  <Picker.Item label="Avans Guards " value="Avans Guards" />
                </Picker>
              </View>
              <Button
                disabled={!fellowship}
                onPress={updateFellow}
                titleStyle={{ color: '#bd69db' }}
                buttonStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                containerStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                type="outline"
                title="Update"
              />
            </View>
          </>
        )}
        <View>
          <ListItem bottomDivider>
            <Icon type="font-awesome-5" name="user" size={20} color="black" />
            <ListItem.Content>
              <ListItem.Title>Update Profile Name</ListItem.Title>
            </ListItem.Content>
            <TouchableOpacity
              onPress={() => setShowProfileName(!showProfileName)}
            >
              <Icon type="font-awesome-5" name="edit" size={20} color="black" />
            </TouchableOpacity>
          </ListItem>
          {showProfileName && (
            <>
              <View style={{ padding: 10, flexDirection: 'row' }}>
                <TextInput
                  style={{ flex: 1 }}
                  value={name}
                  placeholderTextColor="black"
                  placeholder="Enter your Name"
                  onChangeText={(text) => setName(text)}
                />
                <Button
                  onPress={updateName}
                  disabled={!name}
                  titleStyle={{ color: '#bd69db' }}
                  buttonStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  containerStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  type="outline"
                  title="Update"
                />
              </View>
            </>
          )}
          <ListItem bottomDivider>
            <Icon type="font-awesome-5" name="home" size={20} color="black" />
            <ListItem.Content>
              <ListItem.Title>Update Hall or Hostel</ListItem.Title>
            </ListItem.Content>
            <TouchableOpacity
              onPress={() => setShowHallHostel(!showHallHostel)}
            >
              <Icon type="font-awesome-5" name="edit" size={20} color="black" />
            </TouchableOpacity>
          </ListItem>
          {showHallHostel && (
            <>
              <View style={{ padding: 10, flexDirection: 'row' }}>
                <TextInput
                  style={{ flex: 1 }}
                  value={hallHostel}
                  placeholderTextColor="black"
                  placeholder="Enter your Hall or Hostel"
                  onChangeText={(text) => setHallHostel(text)}
                />
                <Button
                  onPress={updateHallHostel}
                  disabled={!hallHostel}
                  titleStyle={{ color: '#bd69db' }}
                  buttonStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  containerStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  type="outline"
                  title="Update"
                />
              </View>
            </>
          )}
          <ListItem bottomDivider>
            <Icon
              type="font-awesome-5"
              name="house-user"
              size={20}
              color="black"
            />
            <ListItem.Content>
              <ListItem.Title>Update Room Number</ListItem.Title>
            </ListItem.Content>
            <TouchableOpacity
              onPress={() => setShowRoomNumber(!showRoomNumber)}
            >
              <Icon type="font-awesome-5" name="edit" size={20} color="black" />
            </TouchableOpacity>
          </ListItem>
          {showRoomNumber && (
            <>
              <View style={{ padding: 10, flexDirection: 'row' }}>
                <TextInput
                  style={{ flex: 1 }}
                  value={roomNumber}
                  placeholderTextColor="black"
                  placeholder="Enter your Hall or Hostel"
                  onChangeText={(text) => setRoomNumber(text)}
                />
                <Button
                  onPress={updateRoomNumber}
                  disabled={!roomNumber}
                  titleStyle={{ color: '#bd69db' }}
                  buttonStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  containerStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  type="outline"
                  title="Update"
                />
              </View>
            </>
          )}
          <ListItem bottomDivider>
            <Icon type="font-awesome-5" name="key" size={20} color="black" />
            <ListItem.Content>
              <ListItem.Title>Update your password</ListItem.Title>
            </ListItem.Content>
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
              <Icon type="font-awesome-5" name="edit" size={20} color="black" />
            </TouchableOpacity>
          </ListItem>
          {showPassword && (
            <>
              <View style={{ padding: 10, flexDirection: 'row' }}>
                <TextInput
                  style={{ flex: 1 }}
                  value={password}
                  placeholderTextColor="black"
                  placeholder="Enter your Password"
                  onChangeText={(text) => setPassword(text)}
                />
                <Button
                  onPress={updatePassword}
                  disabled={!password}
                  titleStyle={{ color: '#bd69db' }}
                  buttonStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  containerStyle={{ borderRadius: 25, borderColor: '#bd69db' }}
                  type="outline"
                  title="Update"
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
