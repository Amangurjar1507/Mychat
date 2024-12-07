import {useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const chatController = () => {
  const [messageList, setMessageList] = useState([]);
  const [typing, setTyping] = useState(false);
  const route = useRoute();
  const [isTyping, setIsTyping] = useState(false);

  const updateTypingStatus = (status: boolean) => {
    firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .update({
        typing: status,
      });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allMessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setMessageList(allMessages);
    });

    const typingSubscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        setTyping(data?.typing ?? false); // Update typing status
      });

    return () => {
      subscriber();
      typingSubscriber();
    };
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };

    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );

    firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc(route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);

    // Send push notification
    messaging()
      .getToken()
      .then(token => {
        // Send push notification to the other user
        messaging().sendToDevice(token, {
          notification: {
            title: 'New Message',
            body: msg.text,
          },
        });
      });

    // Reset typing status
    updateTypingStatus(false);
  }, []);

  const handleTyping = (text: string) => {
    if (text.length > 0) {
      updateTypingStatus(true);
    } else {
      updateTypingStatus(false);
    }
  };
  const onTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  return {
    onSend,
    messageList,
    setMessageList,
    typing,
    setTyping,
    handleTyping,
    onTyping,
    isTyping
  };
};

export default chatController;
