export const LOAD = 'pokedex/pokemon/LOAD';

const load = (list) => {
  return {
    type: LOAD,
    list,
  }
}

const pokemon = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case LOAD:
      return {
        ...state, ...action.list
      };
    default:
      return state;
  }
};

export const getPokemon = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  //
}

export default pokemon;
