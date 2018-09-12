import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import authReducer, * as all from '.';

const mockStore = configureMockStore([thunk]);

const payload = {
  message: 'Generic message',
  data: {
    user: {
      id: 26,
      firstName: 'James',
      lastName: 'Jimmy',
      email: 'james.jimmy@gmail.com',
      updatedAt: '2018-09-11T17:05:09.292Z',
      createdAt: '2018-09-11T17:05:09.292Z',
    },
    accessToken: 'token',
  },
};

const userData = {
  firstName: 'James',
  lastName: 'Jimmy',
  email: 'james@gmail.com',
  password: 'tuesday',
};

describe('Auth reducer test', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(all.initialState);
  });

  it('should handle SIGN_UP_REQUEST', () => {
    expect(authReducer(all.initialState, { type: all.SIGN_UP_REQUEST }))
      .toEqual({ ...all.initialState, isLoading: true });
  });

  it('should handle SIGN_UP_SUCCESS', () => {
    expect(authReducer(all.initialState, {
      type: all.SIGN_UP_SUCCESS,
      payload,
    })).toEqual({
      ...all.initialState,
      isLoading: false,
      user: payload.data.user,
      accessToken: payload.data.accessToken,
      message: payload.message,
    });
  });

  it('should handle SIGN_UP_FAILURE', () => {
    expect(authReducer(all.initialState, {
      type: all.SIGN_UP_FAILURE,
      payload: {
        message: payload.message,
      },
    })).toEqual({
      ...all.initialState,
      isLoading: false,
      message: payload.message,
    });
  });
});

describe('Async action test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch success action for success response', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: payload,
      });
    });
    const expectedActions = [{
      type: all.SIGN_UP_REQUEST,
    },
    {
      type: all.SIGN_UP_SUCCESS,
      payload,
    }];

    const store = mockStore({});
    return store.dispatch(all.signUp(userData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch error action for error response', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: payload.message,
        },
      });
    });
    const expectedActions = [{
      type: all.SIGN_UP_REQUEST,
    },
    {
      type: all.SIGN_UP_FAILURE,
      message: payload.message,
    }];

    const store = mockStore({});
    return store.dispatch(all.signUp(userData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
