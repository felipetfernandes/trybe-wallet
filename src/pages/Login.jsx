import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail, listCurrencies } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(listCurrencies(data));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState({ disabled: this.validateFields() });
    });
  };

  submitLogin = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  validateFields = () => {
    const { email, password } = this.state;
    const PASSWORD_MIN_LENGTH = 6;
    return !(((/([a-z])\w+@[a-z]\w+.com/g).test(email)) && password.length >= PASSWORD_MIN_LENGTH);
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form className="w-screen h-screen bg-zinc-700 flex">
        <div
          className="
          w-3/6 max-w-lg bg-zinc-800
         flex flex-col
         p-10 rounded-xl
         shadow-md m-auto
         gap-4"
        >
          <img
            src="../../public/images/trybe_wallet_icon.png"
            alt="Trybe Wallet Icon"
            className="w-72 self-center"
          />
          <input
            className="p-2 rounded-md"
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
          />
          <input
            className="p-2 rounded-md"
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Senha"
          />
          <button
            className="bg-orange-500 rounded-md text-xl p-2 disabled:bg-orange-200"
            type="submit"
            disabled={ disabled }
            onClick={ (e) => {
              e.preventDefault();
              this.submitLogin();
            } }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
