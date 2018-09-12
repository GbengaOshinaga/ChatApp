import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Spinner } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loader = () => (
  <View style={styles.container}>
    <Spinner color="#E88E3F" />
  </View>
);

export default Loader;
