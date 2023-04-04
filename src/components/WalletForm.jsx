import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestCote, changeExpense } from '../redux/actions';
import save from '../img/save.svg';

function WalletForm() {
  const [id, setId] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const editing = useSelector((state) => state.wallet.editing.state);
  const expenseToEdit = useSelector((state) => state.wallet.editing.expense);
  const currencies = useSelector((state) => state.wallet.currencies);
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const submitExpense = () => {
    dispatch(requestCote({ id, value, description, currency, method, tag }));
    setValue('');
    setDescription('');
    setId((prevId) => prevId + 1);
  };

  const changeSubmit = () => {
    const { exchangeRates } = expenseToEdit;
    dispatch(changeExpense({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates }));
    setValue('');
    setDescription('');
    setId(() => expenses[expenses.length - 1].id + 1);
  };

  useEffect(
    () => {
      if (editing) {
        setValue(expenseToEdit.value);
        setDescription(expenseToEdit.description);
        setId(expenseToEdit.id);
      }
    },
    [editing],
  );

  return (
    <form
      className="
      mt-10 p-5 bg-zinc-800
      rounded-t-2xl flex min-w-full
      justify-center gap-5 shadow-black shadow-md"
    >
      <section className="flex gap-4 flex-wrap">
        <label htmlFor="value" className="text-white font-semibold text-base">
          Value
          <input
            className="w-20 p-1 rounded-lg text-base ml-2 text-black"
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ ({ target: { value: inputValue } }) => setValue(inputValue) }
            value={ value }
          />
        </label>
        <label htmlFor="description" className="text-white font-semibold text-base">
          Description
          <input
            className="w-80 p-1 rounded-lg text-base ml-2  text-black"
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            onChange={ ({ target: { value: inputValue } }) => setDescription(inputValue) }
            value={ description }
          />
        </label>
        <label htmlFor="currency" className="text-white font-semibold text-base">
          Currency
          <select
            className="p-1 rounded-lg text-base ml-2 text-black"
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ ({ target: { value: inputValue } }) => setCurrency(inputValue) }
          >
            {currencies.map((currencie) => (
              <option value={ currencie } key={ currencie }>{currencie}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="text-white font-semibold text-base">
          <select
            className="p-1 rounded-lg text-base ml-2 text-black"
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ ({ target: { value: inputValue } }) => setMethod(inputValue) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="text-white font-semibold text-base">
          <select
            className="p-1 rounded-lg text-base ml-2 text-black"
            id="tag"
            name="tag"
            data-testid="tag-input"
            onChange={ ({ target: { value: inputValue } }) => setTag(inputValue) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </section>
      <button
        type="submit"
        onClick={ (e) => {
          e.preventDefault();
          if (editing) {
            return changeSubmit();
          }
          submitExpense();
        } }
        className="w-8 h-7"
      >
        <img src={ save } alt="Save Button" />
      </button>
    </form>
  );
}

export default WalletForm;
