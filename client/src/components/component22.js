import React, { useState, useRef, useEffect } from 'react'

import './component22.css'

const Component22 = (props) => {
  const [isShowMenu, setShowMenu] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)
  const [selectContract, setSelectContract] = useState(null)
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabTextColor, setTabTextColor] = useState(null);
  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabTextColor(currentTab?.style.color ?? '#0054D1')
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);
  return (
    <div className="component22-container">
      <div className="deposits-and-withdrawals-container2 absolute">
        <button
          name="deposit"
          type="button"
          id="deposit"
          className="deposits-and-withdrawals-button1 button" onClick={() => { setSelectContract("deposit"); setActiveTabIndex(0) }}
          style={{ color: 0 != activeTabIndex ? "black" : "#16b52d" }}
        >
          DEPOSIT
        </button>
        <button
          name="withdraw"
          type="button"
          id="withdraw"
          className="deposits-and-withdrawals-button2 button" onClick={() => { setSelectContract("withdraw"); setActiveTabIndex(1) }}
          style={{ color: 1 != activeTabIndex ? "black" : "#16b52d" }}
        >
          WITHDRAW
        </button>
      </div>
      <div className="deposits-and-withdrawals-container3 absolute">
        {selectedToken == "bnb" ? (
          <img
            src="/playground_assets/image%20%5B41%5D-200h.png"
            alt="bnb"
            id="BNB1"
            className="deposits-and-withdrawals-image1"
          />
        ) : <img
          src="/playground_assets/image%20%5B41%5D-200h.png"
          alt="bnb"
          id="BNB1"
          className="deposits-and-withdrawals-image1" style={{ display: "none" }} />}
        {selectedToken == "busd" ? (
          <img
            src="/playground_assets/image%20%5B40%5D-200h.png"
            alt="image"
            id="BUSD1"
            className="deposits-and-withdrawals-image2"
          />
        ) : null}
        {selectedToken == "usdt" ? (
          <img
            src="/playground_assets/image%20%5B38%5D-200h.png"
            alt="image"
            id="USDT1"
            className="deposits-and-withdrawals-image3"
          />
        ) : null}
        <input
          type="number"
          min="0.01"
          name="amount"
          step="0.1"
          placeholder="0.0"
          autoComplete="0.0"
          id="amount"
          className="deposits-and-withdrawals-textinput input button"
        />
        <div
          data-thq="thq-dropdown"
          className="deposits-and-withdrawals-thq-dropdown list-item" onClick={() => { setShowMenu(!isShowMenu) }}
        >
          <div
            data-thq="thq-dropdown-toggle"
            className="deposits-and-withdrawals-dropdown-toggle"
          >
            <div
              data-thq="thq-dropdown-arrow"
              className="deposits-and-withdrawals-dropdown-arrow"
            ></div>
            <span className="deposits-and-withdrawals-text">&gt;</span>
          </div>
          {isShowMenu ? (
            <ul
              data-thq="thq-dropdown-list"
              className="deposits-and-withdrawals-dropdown-list"
            >
              <li
                data-thq="thq-dropdown"
                className="deposits-and-withdrawals-dropdown teleport-show list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  className="deposits-and-withdrawals-dropdown-toggle1 button" onClick={() => setSelectedToken("bnb")}
                >
                  <button
                    id="BNB"
                    name="BNB"
                    type="button"
                    className="deposits-and-withdrawals-button3 button"
                  >
                    BNB
                  </button>
                </div>
              </li>
              <li
                data-thq="thq-dropdown"
                className="deposits-and-withdrawals-dropdown1 list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  className="deposits-and-withdrawals-dropdown-toggle2 button" onClick={() => setSelectedToken("busd")}
                >
                  <button
                    id="BUSD"
                    name="BUSD"
                    type="button"
                    className="deposits-and-withdrawals-button4 button"
                  >
                    BUSD
                  </button>
                </div>
              </li>
              <li
                data-thq="thq-dropdown"
                className="deposits-and-withdrawals-dropdown2 list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  className="deposits-and-withdrawals-dropdown-toggle3 button" onClick={() => { setSelectedToken("usdt") }}
                >
                  <button
                    id="USDT"
                    name="USDT"
                    type="button"
                    className="deposits-and-withdrawals-button5 button"
                  >
                    USDT
                  </button>
                </div>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
      <button
        name="Submit"
        type="submit"
        id="submit"
        className="deposits-and-withdrawals-button button absolute"
      >
        Submit
      </button>
    </div>
  )
}

export default Component22
