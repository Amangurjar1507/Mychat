import { uuid } from 'react-native-uuid';
 import {useState} from 'react';
 import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import { SignUpControllerHook } from './signUp.interface';
const signUpController = (): SignUpControllerHook => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  
  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name,
        email,
        password,
        mobile:,
        userId: userId,
      })
      .then(res => {
        console.log('user created ');
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
    visible,
  };
};
export default signUpController;
