import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import styles from './signUp.style';
import signUpController from './signUp.controller';
const Signup = () => {
  const {email, setEmail, password, validate, setPassword, registerUser} =
    signUpController();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 20}]}
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
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter Correct Data');
          }
        }}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigation.goBack();
        }}>
        Or Login
      </Text>
    </View>
  );
};

export default Signup;
