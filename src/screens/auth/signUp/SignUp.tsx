import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import styles from './signUp.style';
import signUpController from './signUp.controller';
const Signup = () => {
  const { email,
    setEmail,
    password,
    setPassword,
    registerUser,
    nameError,
    emailError ,
    passwordError,} =
    signUpController();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Enter Name"
        style={[styles.input, {marginTop: 50}]}
        value={name}
        onChangeText={txt => setName(txt)}
        placeholderTextColor={'black'}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
        placeholderTextColor={'black'}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
        placeholderTextColor={'black'}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          registerUser();
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
