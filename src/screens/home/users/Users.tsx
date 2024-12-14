import {
  View,
  Text,
   FlatList,
   Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import styles from './user.style';

let id = '';
const Users = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [name, setName] = useState('LIGHT');
  useEffect(() => {
    requestUserPermission();
    getUsers();
    goToNext();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // Log({logLable: 'Authorization status', logValue: authStatus});
    }
  };
  useEffect(() => {
     
    messaging().onMessage(remoteMessage => {
      /** Show notification popup */
       PushNotification.localNotification({
        channelId: 'default-channel-id', 
        channelName: 'Default Channel', // Required for Android        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
       if (remoteMessage) {
      }
    });

     messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
        }
      });
  }, []);

 
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all saved user data
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}], // Navigate back to the Login screen
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const goToNext = async () => {
    try {
      // Retrieve the 'NAME' value from AsyncStorage
      const storedName = await AsyncStorage.getItem('NAME');
      if (storedName) {
        setName(storedName); // Update state with the retrieved value
      } else {
        console.log('No name found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error retrieving NAME from AsyncStorage:', error);
    }
  };

  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');

    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  };
  console.log('users', users);

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <View style={{marginLeft: 15}}>
          <Image
            source={require('../images/user.png')}
            style={styles.userIcon}
          />
        </View>
        <Text style={styles.headerText}>{name}</Text>
        <Text onPress={handleLogout} style={styles.logoutText}>
          Log out
        </Text>
      </View>

      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.userItem, {backgroundColor: 'white'}]}
              onPress={() => {
                navigation.navigate('Chat', {data: item, id: id});
              }}>
              <Image
                source={require('../images/user.png')}
                style={styles.userIcon}
              />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Users;
  
