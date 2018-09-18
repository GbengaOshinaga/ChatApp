import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

import { Loader } from '../../components/Common';

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuthStatus();
  }

  checkAuthStatus = async () => {
    const accessToken = await AsyncStorage.getItem('USER_DATA');
    this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <Loader />
    );
  }
}

AuthLoading.propTypes = propTypes;

export default AuthLoading;
