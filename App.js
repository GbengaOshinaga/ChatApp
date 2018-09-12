import React from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import Navigation from './src/Navigation';
import store from './src/redux/createStore';

const App = () => (
  <Provider store={store}>
    <Root>
      <Navigation />
    </Root>
  </Provider>);

export default App;
