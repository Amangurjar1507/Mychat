import { uuid } from 'react-native-uuid';
 import { useState, useEffect } from 'react';
 import { Alert } from 'react-native';
 import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import { SignUpControllerHook } from './signUp.interface';
import messaging from '@react-native-firebase/messaging';
 
const signUpController = (): SignUpControllerHook => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [token, setToken] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    getFCMToken();
    requestUserPermission();
  }, []);

  
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
     }
  };
  const isValidGmail = email => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const getFCMToken = async () => {
    try {
       const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
           setToken(fcmToken);
        } else {
          console.warn('Failed to get FCM token');
        }
      } else {
        console.warn('Permission not granted');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };
  const registerUser = () => {
    let valid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    if (!name.trim()) {
      setNameError('Please enter your name.');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Please enter your email.');
      valid = false;
    } else if (!isValidGmail(email)) {
      setEmailError('Please enter a valid Gmail address.');
      valid = false;
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      valid = false;
    }
    if (!valid) return;

    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        token: token,
        userId: userId,
      })
      .then(res => {
        Alert.alert('user created ');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    registerUser,
    nameError, setNameError,
    emailError, setEmailError ,
    passwordError, setPasswordError };
};
export default signUpController;
