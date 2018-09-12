import React from 'react';
import renderer from 'react-test-renderer';

import { SignUpScreen } from '.';

const props = {
  isLoading: false,
  signUp: jest.fn(),
  navigation: jest.fn(),
};

it('renders without crashing', () => {
  const rendered = renderer.create(<SignUpScreen {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
