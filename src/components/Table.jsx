import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  deleteButton = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  editButton = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="min-w-full">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-l-0">Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th className="border-r-0">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td name="description" className="border-l-0">{expense.description}</td>
                <td name="tag">{expense.tag}</td>
                <td name="method">{expense.method}</td>
                <td name="value">{Number(expense.value).toFixed(2)}</td>
                <td name="currency">{expense.exchangeRates[expense.currency].name}</td>
                <td name="currencyRate">
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td name="convertedValue">
                  {(Number(expense.value)
            * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                </td>
                <td name="baseCurrency">Real</td>
                <td name="changeButtons" className="flex justify-around border-r-0">
                  <button
                    className="w-6"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editButton(expense) }
                  >
                    <img src="../../public/images/edit.svg" alt="Edit Button" />
                  </button>
                  <button
                    className="w-6"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteButton(expense.id) }
                  >
                    <img src="../../public/images/trash.svg" alt="Delete Button" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="
         h-12
         min-w-full
         bg-zinc-800
         rounded-b-2xl
         shadow-black shadow-md"
        />
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses || [],
});

export default connect(mapStateToProps)(Table);
