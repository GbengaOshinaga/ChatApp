import React from 'react';
import { View, Text } from 'react-native';

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'ChatApp',
  }

  render() {
    return (
      <View>
        <Text>Chat Screen</Text>
      </View>
    );
  }
}

export default ChatScreen;
