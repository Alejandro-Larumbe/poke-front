import { baseUrl } from './config';


export const LOAD = 'pokedex/pokemon/LOAD';


const load = (list) => {
  return {
    type: LOAD,
    list,
  }
};

const pokemon = (state = {}, action) => {
  console.log(state)
  Object.freeze(state)
  switch (action.type) {
    case LOAD:
      return {
        ...state, list: [...action.list]
      };
    default:
      return state;
  }
};

export const getPokemon = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (response.ok) {
    const res = await response.json()
    dispatch(load(res))
  }
}

export default pokemon;
