import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Component13 from '../components/component13'
import Component14 from '../components/component14'
import Component15 from '../components/component15'
import Component16 from '../components/component16'
import Component17 from '../components/component17'
import Component18 from '../components/component18'
import Home from './Home'
import './chatblockai.css'

const Chatblockai = (props) => {
    return (
        <div className="chatblockai-container">
            <Helmet>
                <title>Chatblock</title>
                <meta property="og:title" content="Miniature Spherical Gorilla" />
            </Helmet>
            <img
                alt="Mascot"
                src="/playground_assets/layers%20%5B2%5D-300w.png"
                className="chatblockai-image"
            />
            <img
                alt="Site name"
                src="/playground_assets/landing%20page%20%5B2%5D-200h.png"
                className="chatblockai-image1"
            />
            {/* <Link to="/sign-in" className="chatblockai-navlink">
                <Component13
                    image_alt="Launch app"
                    rootClassName="component13-root-class-name"
                    className="chatblockai-component"
                ></Component13>
            </Link> */}
            <Link to="/init" target="_blank" className="chatblockai-navlink">
                <Component13
                    image_alt="Launch app"
                    rootClassName="component13-root-class-name"
                    className="chatblockai-component"
                ></Component13>
            </Link>
            <div className="chatblockai-container1">
                <a
                    href="https://t.me/ChatBlockAI"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="chatblockai-link"
                >
                    <Component14
                        image_alt="Telegram"
                        rootClassName="component14-root-class-name"
                        className="chatblockai-component1"
                    ></Component14>
                </a>
                <a
                    href="https://discord.gg/ZwXZyUdDKz"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="chatblockai-link1"
                >
                    <Component15
                        image_alt="Discord"
                        rootClassName="component15-root-class-name"
                        className="chatblockai-component2"
                    ></Component15>
                </a>
                <a
                    href="https://twitter.com/ChatBlock_Ai"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="chatblockai-link2"
                >
                    <Component16
                        image_alt="Twitter"
                        rootClassName="component16-root-class-name"
                        className="chatblockai-component3"
                    ></Component16>
                </a>
                <a
                    href="https://medium.com/@chatblock.ai"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="chatblockai-link3"
                >
                    <Component17
                        image_alt="Medium"
                        rootClassName="component17-root-class-name"
                        className="chatblockai-component4"
                    ></Component17>
                </a>
                <a
                    href="https://forms.gle/1Kq44NVEMUnUBCuZA"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="chatblockai-link4"
                >
                    <Component18
                        image_alt="Pancake"
                        className="chatblockai-component5"
                    ></Component18>
                </a>
            </div>
            <img
                alt="Dino"
                src="/playground_assets/4ff07986208593.5d9a654e92f36%20%5B1%5D-600w.gif"
                className="chatblockai-image2"
            />
            <a
                href="/images/docs.pdf"
                rel="noreferrer noopener"
                className="chatblockai-link5"
                target="_blank"
            >
                <img
                    alt="image"
                    src="/playground_assets/landing%20page%20%5B2%5D%20%5B1%5D1-200h.png"
                    className="chatblockai-image3"
                />
            </a>
            {/* <Link
                to="/init" target="_blank"
                rel="noreferrer noopener"
                className="chatblockai-link5"
            >
                <img
                    alt="image"
                    src="/playground_assets/landing%20page%20%5B2%5D%20%5B1%5D1-200h.png"
                    className="chatblockai-image3"
                />
            </Link> */}
        </div>
    )
}

export default Chatblockai
