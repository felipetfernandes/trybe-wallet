// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions/actionTypes';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_EMAIL:
    return ({ ...state, email: payload });
  default:
    return state;
  }
};

export default user;
