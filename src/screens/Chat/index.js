/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'native-base';
import {
  View, Text, AsyncStorage, Platform,
} from 'react-native';

const propTypes = {
  navigation: PropTypes.any.isRequired,
};

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ChatApp',
    headerRight: (
      <Button
        transparent
        light
        style={{ paddingRight: 10 }}
        onPress={navigation.getParam('logOut')}
      >
        <Icon name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'} />
      </Button>
    ),
  })

  async componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ logOut: this.logOut });
    const accessToken = navigation.getParam('accessToken');
    const user = navigation.getParam('user');
    const userData = { user, accessToken };
    await AsyncStorage.setItem('USER_DATA', JSON.stringify(userData));
  }

  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View>
        <Text>Chat Screen</Text>
      </View>
    );
  }
}

ChatScreen.propTypes = propTypes;

export default ChatScreen;
