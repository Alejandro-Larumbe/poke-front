import { baseUrl } from '../config';

const SET_TOKEN = 'pokedex/authentication/SET_TOKEN';
const TOKEN_KEY = 'key';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const setToken = (token) => (
  {
    type: SET_TOKEN,
    token,
  }
);

export const removeToken = () => (
  {
    type: REMOVE_TOKEN,
  }
);

export const logout = () => async dispatch => {
  const token = localStorage.getItem(TOKEN_KEY)
  const response = await fetch(`${baseUrl}/session`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  if (response.ok) {
    localStorage.removeItem(TOKEN_KEY)
    dispatch(removeToken())
  }
}

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/session`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(TOKEN_KEY, token)
    dispatch(setToken(token))
  }
};

export const loadToken = () => dispatch => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    dispatch(setToken(token))
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    };
    default: return state;
  }
}
