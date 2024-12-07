import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import chatController from './chat.controller';
import messaging from '@react-native-firebase/messaging';

const Chat = () => {
  const {onSend,isTyping, messageList,onTyping setMessageList, typing, setTyping} =
    chatController();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
    });
    return unsubscribe;
  }, []);



  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{_id: 1}} 
        onInputTextChanged={onTyping}  
        renderInputToolbar={props => <InputToolbar {...props} />}
      />
      {isTyping && (
        <View style={{position: 'absolute', bottom: 10, left: 10}}>
          User is typing...
        </View>
      )}
    </View>
  );
};

export default Chat;
