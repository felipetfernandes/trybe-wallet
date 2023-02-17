import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header
        className="
      flex justify-between p-5
      bg-zinc-800 text-white
      rounded-2xl min-w-full shadow-black shadow-md"
      >
        <div className="flex items-center gap-2">
          <img
            src="..../../public/images/trybe_wallet_icon.png"
            alt="Wallet Icon"
            className="w-10"
          />
          <p data-testid="email-field" className="italic">{email}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p data-testid="total-field">
            {(expenses
              .reduce(
                (acc, expense) => acc + (Number(expense.value)
              * expense.exchangeRates[expense.currency].ask),
                0,
              )
              .toFixed(2))}
          </p>
          <p
            data-testid="header-currency-field"
            className="text-orange-400 font-semibold mr-2"
          >
            BRL
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses || [],
});

export default connect(mapStateToProps)(Header);
