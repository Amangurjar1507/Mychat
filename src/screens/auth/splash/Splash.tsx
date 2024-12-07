import {View, Text} from 'react-native';
import React from 'react';
import styles from './splash.style';
import splashController from './splash.controller';
const Splash = () => {
  const {} = splashController();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'Firebase Chat\nApp'}</Text>
    </View>
  );
};

export default Splash;
