/* eslint-disable react/forbid-prop-types */
/* eslint-disable global-require */

import React from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { connect } from 'react-redux';
import {
  Container, Content, Form, Item, Input, Button, Text, Toast,
} from 'native-base';

import { signUp } from '../../redux/modules/auth';
import Loader from '../../components/Common';
import emailValidator from '../../helpers';
import styles from './styles';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  navigation: PropTypes.any.isRequired,
  accessToken: PropTypes.string,
};

const defaultProps = {
  accessToken: null,
};

export class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      hasFontLoaded: false,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ hasFontLoaded: true });
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken) {
      await AsyncStorage.setItem('accessToken', nextProps.accessToken);
      this.props.navigation.navigate('App');
    }
  }

  onClickSubmit = () => {
    const { data } = this.state;

    if (!emailValidator(data.email)) {
      Toast.show({
        text: 'Invalid Email Address',
        type: 'danger',
        position: 'top',
        duration: 3000,
      });
      return;
    }

    this.props.signUp(data);
  }

  render() {
    const { hasFontLoaded } = this.state;
    const { isLoading } = this.props;

    if (!hasFontLoaded || isLoading) {
      return (
        <Loader />
      );
    }

    return (
      <Container>
        <Content padder>
          <Form>
            <Item>
              <Input
                placeholder="First Name"
                textContentType="name"
                onChangeText={firstName => this.setState({ data: { firstName } })}
              />
            </Item>
            <Item>
              <Input
                placeholder="Last Name"
                textContentType="name"
                onChangeText={lastName => this.setState({ data: { lastName } })}
              />
            </Item>
            <Item>
              <Input
                placeholder="Email"
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={email => this.setState({ data: { email } })}
              />
            </Item>
            <Item last>
              <Input
                secureTextEntry
                placeholder="Password"
                textContentType="password"
                onChangeText={password => this.setState({ data: { password } })}
              />
            </Item>
          </Form>
          <Button style={styles.button} block onPress={this.onClickSubmit}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
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
