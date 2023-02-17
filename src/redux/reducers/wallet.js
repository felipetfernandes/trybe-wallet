// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  CHANGE_EXPENSE,
  DEL_EXPENSE,
  EDIT_EXPENSE,
  LIST_CURRENCIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  editing: {
    state: false,
  },
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LIST_CURRENCIES:
    return ({
      ...state,
      currencies: Object.keys(payload)
        .filter((currencie) => currencie !== 'USDT') });
  case ADD_EXPENSE:
    if (state.expenses) {
      return ({
        ...state,
        expenses: [...state.expenses, payload],
      });
    }
    return ({
      ...state,
      expenses: [payload],
    });
  case DEL_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    });
  case EDIT_EXPENSE:
    return ({
      ...state,
      editing: {
        state: true,
        expense: payload,
      },
    });
  case CHANGE_EXPENSE:
    return ({
      ...state,
      editing: {
        state: false,
      },
      expenses: state.expenses
        .map((expense) => ((expense.id === payload.id) ? payload : expense)),
    });
  default:
    return state;
  }
};

export default wallet;
