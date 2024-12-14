 import React, {useCallback, useEffect, useState} from 'react';
import { GiftedChat} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {  Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
 import ImagePicker from 'react-native-image-crop-picker';

const chatController = () => {
  const [messageList, setMessageList] = useState([]);
  const route:any = useRoute();
 
  const navigation = useNavigation();
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.7,
    }).then(image => {
      const imageMessage = {
        _id: Date.now(),
        createdAt: new Date(),
        user: {
          _id: route.params.id, // Sender's ID
          name: route.params.data.name,
        },
        image: image.path, // Set the image path
      };
      onSend([imageMessage]); // Send the image as a message
    });
  };

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        sound: true,
      });

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted.');
       } else {
        Alert.alert(
          'Permission Denied',
          'You need to enable notifications to receive them. Please allow permissions from settings.',
        );
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
      Alert.alert(
        'Error',
        'An error occurred while requesting permissions. Please try again.',
      );
    }
  };

 
  useEffect(() => {
    requestUserPermission(route.params.data.token);
    configureNotifications();
  }, []);
  // Configure local notifications
  const configureNotifications = () => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },

      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // Required for Android
        channelName: 'Default Channel', // Required for Android
        channelDescription: 'A default channel',
        importance: 4,
        vibrate: true,
      },
      created =>
        console.log(created ? 'Channel created' : 'Channel creation failed'),
    );
  };

   
 
   useEffect(() => {
      const unsubscribe = firestore()
        .collection('chats')
        .doc(route.params.id + route.params.data.userId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const allMessages = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            createdAt: doc.data().createdAt,
          }));
          setMessageList(allMessages);
        });
  
      // Cleanup function to unsubscribe
      return () => unsubscribe();
    }, [route.params.id, route.params.data.userId]);
  const listenForNotifications = userId => {
    return firestore()
      .collection('notifications')
      .doc(userId)
      .collection('userNotifications')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const notification = change.doc.data();

            // Check if the notification is not for the sender themselves
            if (notification.sendBy !== userId) {
              PushNotification.localNotification({
                channelId: 'default-channel-id',
                title: notification.title,
                message: notification.body,
                vibration: 300,
                soundName: 'default',
              });

              // Delete the notification after showing it
              change.doc.ref.delete();
            }
          }
        });
      });
  };
  useEffect(() => {
    const userId = route.params.id; // Logged-in user's ID
    const unsubscribe = listenForNotifications(userId); // Listen for the user's notifications
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const onSend = useCallback(
    async (messages = []) => {
      const msg = messages[0];
      const myMsg = {
        ...msg,
        sendBy: route.params.id, // Sender's ID
        sendTo: route.params.data.userId, // Recipient's ID
        createdAt: Date.now(), // Timestamp for the message
      };
  
      // Append the message to the chat interface
      setMessageList(previousMessages =>
        GiftedChat.append(previousMessages, myMsg),
      );
  
      const chatId1 = ${route.params.id}${route.params.data.userId};
      const chatId2 = ${route.params.data.userId}${route.params.id};
  
      try {
        await firestore()
          .collection('chats')
          .doc(chatId1)
          .collection('messages')
          .add(myMsg);
  
        await firestore()
          .collection('chats')
          .doc(chatId2)
          .collection('messages')
          .add(myMsg);
  
        if (msg.image) {
          await firestore()
            .collection('notifications')
            .doc(route.params.data.userId)
            .collection('userNotifications')
            .add({
              title: 'New Image',
              body: 'You received an image.',
              sendBy: route.params.id,
              createdAt: new Date().toISOString(),
            });
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    [route.params.id, route.params.data.userId],
  );


  const handleBackPress = () => {
    navigation.goBack(); // Navigate to the previous screen
  };
  return {
    onSend,
    messageList,
    setMessageList,
    choosePhotoFromLibrary,
    handleBackPress
  };
};

export default chatController;
