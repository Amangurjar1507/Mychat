import {View, Text} from 'react-native';
import React  from 'react';
import splashController from './splash.controller';
import styles from './splash.style';
 const Splash = () => {
 const {}=splashController()
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'Splash'}</Text>
    </View>
  );
};

export default Splash;
 
