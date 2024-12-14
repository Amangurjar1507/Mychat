import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { Text, Image } from 'react-native';
import styles from './chat.style';
import chatController from './chat.controller';

const Chat = () => {
  const { onSend,
    messageList,
    choosePhotoFromLibrary,
    handleBackPress } = chatController()
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/130/130882.png',
            }}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>{route.params.data.name}</Text>
        </View>
      </View>
      <Text style={{ color: "green", padding: 20, fontSize: 20 }} onPress={choosePhotoFromLibrary}>Image</Text>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id, // User ID
        }}
        renderMessageImage={props => (
          <Image
            source={{ uri: props.currentMessage.image }}
            style={{ width: 200, height: 200, borderRadius: 10, margin: 5 }}
          />
        )}
        placeholder="Type a message..."
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: 'white', borderRadius: 15 },
              right: { backgroundColor: 'black', borderRadius: 15 },
            }}
            textStyle={{
              left: { color: 'black' },
              right: { color: 'white' },
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{ borderTopColor: 'gray', paddingVertical: 5 }}
            textInputStyle={{ color: 'black', fontSize: 17 }}
          />
        )}
      />

    </View>
  );
};



export default Chat;