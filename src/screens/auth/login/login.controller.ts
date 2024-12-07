import {useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {LoginHooks} from './login.interface';

const loginController = (): LoginHooks => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }
    setVisible(true);
    try {
      const response = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      setVisible(false);

      if (!response.empty) {
        const userData = response.docs[0].data();
        goToNext(userData.name, userData.email, userData.userId);
      } else {
        Alert.alert('Error', 'User not found.');
      }
    } catch (error) {
      setVisible(false);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  const goToNext = async (name: string, email: string, userId: string) => {
    try {
      await AsyncStorage.setItem('NAME', name);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('USERID', userId);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data. Please try again.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
    visible,
  };
};

export default loginController;