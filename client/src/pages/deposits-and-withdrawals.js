import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Component22 from '../components/component22'
import './deposits-and-withdrawals.css'

const DepositsAndWithdrawals = (props) => {
  return (
    <div className="deposits-and-withdrawals-container">
      <Helmet>
        <title>Deposits and Withdrawals</title>
        <meta
          property="og:title"
          content="Deposits-and-Withdrawals - Miniature Spherical Gorilla"
        />
      </Helmet>
      <Link to="/chatblockai" className="deposits-and-withdrawals-navlink">
        <img
          alt="image"
          src="/playground_assets/simple-home-with-pixel-art-style_475147-414%20%5B1%5D-modified-300w.png"
          className="deposits-and-withdrawals-image"
        />
      </Link>
        <Component22></Component22>
      <img
        alt="image"
        src="/playground_assets/layers%20%5B6%5D-200h.png"
        className="deposits-and-withdrawals-image1"
      />
    </div>
    
  )
}

export default DepositsAndWithdrawals
