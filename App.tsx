import React, {useEffect} from 'react';
import {LogBox, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging'; // Ensure Firebase messaging is installed
import Route from './src/navigation';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    const requestPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permission granted');
      } else if (
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('Notification permission provisionally granted');
      } else {
        console.log('Notification permission denied');
      }
    };

    if (Platform.OS === 'ios') {
      requestPermission();
    }

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage.notification);
    });

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  return <Route />;
};

export default App;
