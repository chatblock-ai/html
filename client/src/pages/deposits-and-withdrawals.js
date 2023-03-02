import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Component22 from '../components/component22'
import './deposits-and-withdrawals.css'

const DepositsAndWithdrawals = (props) => {
  return (
    <div className="deposits-and-withdrawals-container">
      <Helmet>
        <title>Deposits-and-Withdrawals - Miniature Spherical Gorilla</title>
        <meta
          property="og:title"
          content="Deposits-and-Withdrawals - Miniature Spherical Gorilla"
        />
      </Helmet>
      <div className="deposits-and-withdrawals-container1">
        <Component22></Component22>
        <Link to="/sign-in" className="deposits-and-withdrawals-navlink">
          <img
            src="/playground_assets/simple-home-with-pixel-art-style_475147-414%20%5B1%5D-modified-300w.png"
            alt="Home button"
            className="deposits-and-withdrawals-image"
          />
        </Link>
        <button
          name="Submit"
          type="submit"
          className="deposits-and-withdrawals-button button"
        >
          Submit
        </button>
        <div className="deposits-and-withdrawals-container2">
          <button
            name="deposit"
            type="button"
            className="deposits-and-withdrawals-button1 button"
          >
            DEPOSIT
          </button>
          <button
            name="withdraw"
            type="button"
            className="deposits-and-withdrawals-button2 button"
          >
            WITHDRAW
          </button>
        </div>
        <div className="deposits-and-withdrawals-container3">
          <input
            type="number"
            min="0.01"
            name="amount"
            step="0.1"
            placeholder="0.0"
            autoComplete="0.0"
            className="deposits-and-withdrawals-textinput input button"
          />
          <button
            id="drop"
            name="drop menu"
            type="button"
            className="deposits-and-withdrawals-button3 button"
          >
            &gt;
          </button>
        </div>
      </div>
      <img
        src="/playground_assets/layers%20%5B6%5D-200h.png"
        alt="image"
        className="deposits-and-withdrawals-image1"
      />
    </div>
  )
}

export default DepositsAndWithdrawals
