import {View} from 'react-native';
import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import chatController from './chat.controller';

const Chat = () => {
  const {onSend, messageList, setMessageList} = chatController();
  return (
    <View>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

export default Chat;
