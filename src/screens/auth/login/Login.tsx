import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './login.style';
import Loader from '../../../components/Loader';
import loginController from './login.controller';
const Login = () => {
  const {email, setEmail, password, setPassword, loginUser} = loginController();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 100}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          loginUser();
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Or Sign Up
      </Text>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;
