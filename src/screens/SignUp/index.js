
import React from 'react';
import {
  KeyboardAvoidingView, View, Animated, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { connect } from 'react-redux';
import {
  Container, Content, Form, Button, Text,
} from 'native-base';

import { signUp } from '../../redux/modules/auth';
import { Loader, InputItem } from '../../components/Common';
import validate from '../../helpers';
import styles from './styles';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  accessToken: PropTypes.string,
};

const defaultProps = {
  accessToken: null,
};

export class SignUpScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      errors: {
        errorFirstName: null,
        errorLastName: null,
        errorEmail: null,
        errorPassword: null,
      },
      hasFontLoaded: false,
    };

    this.imageHeight = new Animated.Value(200);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ hasFontLoaded: true });

    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  async componentWillReceiveProps(nextProps) {
    const { accessToken, user } = nextProps;
    const userData = { user, accessToken };
    if (accessToken) {
      this.props.navigation.navigate('App', userData);
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardDidShow = () => {
    Animated.timing(this.imageHeight, {
      toValue: 100,
    }).start();
  };

  keyboardDidHide = () => {
    Animated.timing(this.imageHeight, {
      toValue: 200,
    }).start();
  };

  onClickSubmit = () => {
    const { data } = this.state;

    const { errors, hasErrors } = validate(data);
    this.setState({ errors });

    if (hasErrors) {
      return;
    }

    this.props.signUp(data);
  }

  onTextChange = state => (value) => {
    const { data } = this.state;
    data[state] = value;
    this.setState({ data });
  }

  render() {
    const {
      hasFontLoaded,
      errors: {
        errorFirstName, errorLastName, errorEmail, errorPassword,
      },
    } = this.state;
    const { isLoading } = this.props;

    if (!hasFontLoaded || isLoading) {
      return (
        <Loader />
      );
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Container>
          <Content padder>
            <Animated.Image
              source={require('../../../assets/chat.png')}
              style={[styles.logo, { height: this.imageHeight }]}
            />
            <View>
              <Form>
                <InputItem
                  placeholder="First Name"
                  textContentType="name"
                  onChangeText={this.onTextChange('firstName')}
                  error={errorFirstName}
                />
                <InputItem
                  placeholder="Last Name"
                  textContentType="name"
                  onChangeText={this.onTextChange('lastName')}
                  error={errorLastName}
                />
                <InputItem
                  placeholder="Email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  onChangeText={this.onTextChange('email')}
                  error={errorEmail}
                />
                <InputItem
                  secureTextEntry
                  placeholder="Password"
                  textContentType="password"
                  onChangeText={this.onTextChange('password')}
                  error={errorPassword}
                />
              </Form>
              <Button style={styles.button} block onPress={this.onClickSubmit}>
                <Text>Submit</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  accessToken: state.auth.accessToken,
  user: state.auth.user,
});

const mapDispatchToProps = { signUp };

SignUpScreen.propTypes = propTypes;
SignUpScreen.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
