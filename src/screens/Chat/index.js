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

  componentDidMount() {
    this.props.navigation.setParams({ logOut: this.logOut });
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
