import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './screens/AuthLoading';
import SignUpScreen from './screens/SignUp';
import ChatScreen from './screens/Chat';

const AppStack = createStackNavigator({
  Dashboard: ChatScreen,
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const AuthStack = createStackNavigator({
  SignUp: SignUpScreen,
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
},
{
  initialRouteName: 'AuthLoading',
});
