// Coloque aqui suas actions
import {
  SAVE_EMAIL,
  LIST_CURRENCIES,
  ADD_EXPENSE,
  DEL_EXPENSE,
  EDIT_EXPENSE,
  CHANGE_EXPENSE } from './actionTypes';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const listCurrencies = (payload) => ({
  type: LIST_CURRENCIES,
  payload,
});

export const addExpense = (payload, exchangeRates) => ({
  type: ADD_EXPENSE,
  payload: { ...payload, exchangeRates },
});

export const requestCote = (payload) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(addExpense(payload, data));
  } catch (error) {
    console.log(error);
  }
};

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const changeExpense = (payload) => ({
  type: CHANGE_EXPENSE,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DEL_EXPENSE,
  payload,
});
