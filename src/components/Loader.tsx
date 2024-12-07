import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import styles from './loader.style';
import {LoaderHooks} from './Loader.interface';

const Loader: React.FC<LoaderHooks> = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
