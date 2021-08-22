import React, { useLayoutEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { auth, db } from '../../firebase';
import firebase from 'firebase';

export default function ChatScreen({ navigation, route }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            rounded
            containerStyle={{
              marginLeft: 20,
            }}
            source={{
              uri: messages[0]?.data.photoURL,
            }}
          />
          <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>
            {route.params.chatName}
          </Text>
        </View>
      ),

      //   headerLeft: () => (
      //     <TouchableOpacity
      //       style={{ marginLeft: 10 }}
      //       onPress={navigation.goBack}
      //     >
      //       <AntDesign name="arrowleft" size={24} color="white" />
      //     </TouchableOpacity>
      //   ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  // 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

  const sendMessage = () => {
    db.collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      })
      .then(() => {
        setInput('');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          contentContainerStyle={{
            paddingTop: 15,
          }}
        >
          {messages.map(({ id, data }) =>
            data.email === auth?.currentUser.email ? (
              <View key={id} style={[styles.reciever]}>
                <Avatar
                  size={30}
                  containerStyle={{
                    position: 'absolute',
                    bottom: -15,
                    right: -5,
                  }}
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  rounded
                  source={{ uri: data.photoURL }}
                />
                <Text style={styles.recieverText}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={[styles.sender]}>
                <Avatar
                  size={30}
                  containerStyle={{
                    position: 'absolute',
                    bottom: -15,
                    right: -5,
                  }}
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  rounded
                  source={{ uri: data.photoURL }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Signal Message"
            style={styles.textInput}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={0.5}
            disabled={input.length === 0 ? true : false}
          >
            <Ionicons name="send" size={24} color="#2b68e6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  senderText: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 10,
    color: 'white',
  },
  senderName: { left: 10, paddingRight: 10, fontSize: 10, color: 'white' },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ececec',
    borderWidth: 1,
    padding: 10,
    color: 'gray',
    borderRadius: 30,
  },
});
