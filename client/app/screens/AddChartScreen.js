import React, { useLayoutEffect, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { db } from '../../firebase';

export default function AddChartScreen({ navigation }) {
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats',
    });
  }, []);

  const createChat = async () => {
    await db
      .collection('chats')
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={createChat} title="Create new Chat" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
    flex: 1,
  },
});
