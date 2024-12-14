import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SplashControllerHook} from './splash.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
const splashController = (): SplashControllerHook => {
   const navigation = useNavigation();
    useEffect(() => {
      setTimeout(() => {
        checkLogin();
      }, 2000);
    }, []);
    const checkLogin = async () => {
      const id = await AsyncStorage.getItem('USERID');
      if (id !== null) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Login');
      }
    };
  return {
    checkLogin,
  };
};
export default splashController;
