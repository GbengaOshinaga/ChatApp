import axios from 'axios';

// Actions
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const initialState = {
  isLoading: false,
  user: null,
  accessToken: null,
  message: '',
};

const baseUrl = 'http://private-1db3f-gbengaoshinaga.apiary-mock.com/api/v1';

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data.user,
        accessToken: action.payload.data.accessToken,
        message: action.payload.message,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

// Action Creators
const signUpRequest = () => ({ type: SIGN_UP_REQUEST });

const signUpSuccess = payload => ({ type: SIGN_UP_SUCCESS, payload });

const signUpFailure = message => ({ type: SIGN_UP_FAILURE, message });

export const signUp = data => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const response = await axios.post(`${baseUrl}/signup`, data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    dispatch(signUpSuccess(response.data));
  } catch (error) {
    dispatch(signUpFailure(error.response.data.message));
  }
};
