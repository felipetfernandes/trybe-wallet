import PropTypes from 'prop-types';
import React, { Component } from 'react';
import notFound from '../img/404.png';

export default class NotFound extends Component {
  render() {
    const { history } = this.props;
    return (
      <div
        className="w-screen h-screen bg-zinc-800
         flex flex-col items-center gap-20"
      >
        <img src={ notFound } alt="404 error, page not found" />
        <h1
          className="text-2xl text-white font-bold"
        >
          THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST
        </h1>
        <button
          className="bg-orange-500 rounded-md
          text-xl text-white p-4 px-20 disabled:bg-orange-200"
          type="button"
          onClick={ () => {
            history.push('/');
          } }
        >
          GO HOME
        </button>
      </div>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
