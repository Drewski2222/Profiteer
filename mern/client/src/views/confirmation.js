import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './confirmation.css'
import { bool } from 'prop-types';

import axios from 'axios';

import { usePlaidLink, PlaidLinkOptions } from 'react-plaid-link';

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const Confirmation = (props) => {
  const [linkTokenData, setLinkTokenData] = useState(null);

  useEffect(() => {
    const initializeLink = async () => {
      try {
        const response = await axios.post("http://localhost:5000/server/tokens/generate_link_token", {});
        setLinkTokenData(response.data);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    initializeLink();
  }, []);

  const handleSuccess = async (public_token, metadata) => {
    console.log(`I have a public token: ${public_token}. I should exchange this.`);
    exchangeToken(public_token);
  };

  const handleError = (err, metadata) => {
    if (err != null && err.error_code === 'INVALID_LINK_TOKEN') {
      console.log('Need new LINK_TOKEN');
    }
    console.log(`I'm all done. Error: ${JSON.stringify(err)}. Metadata: ${JSON.stringify(metadata)}`);
  };

  const { open, ready } = usePlaidLink({
    token: linkTokenData ? linkTokenData.link_token : '',
    onSuccess: handleSuccess,
    onExit: handleError,
    onEvent: (eventName, metadata) => {
      console.log(`Event ${eventName}`);
    },
  });

  useEffect(() => {
    if (ready && linkTokenData) {
      open();
    }
  }, [ready, linkTokenData, open]);

  const exchangeToken = async (publicToken) => {
    axios.post("http://localhost:5000/server/tokens/exchange_public_token", {
      public_token: publicToken,
    }).then((response) => {
      // Handle response
    }).catch((error) => {
      console.error('Error exchanging public token:', error);
    });
  }

  // index.js functions
  const checkConnectedStatus = async function () {
    try {
      const connectResponse = await fetch('/server/token/is_user_connected');
      const connectedData = await connectedResponse.json();
      console.log(JSON.stringify(connectedData));
      if (connectedData.status === true) {
        // set connected stuff in html
        connectedPlaid = true;
        showInstitutionName();
      }
      else {
        // set disconnected stuff in html
        connectedPlaid = false;
      }
    }
    catch (error) {
      console.error('We encountered an error: ${error}');
    }
  };

  const showInstitutionName = async function() {
    const bankData = await fetch("/server/token/get_bank_name");
    const bankJSON = await bankData.json();
    console.log(JSON.stringify(bankJSON));
    // set html stuff
    connectedPlaid = true;
    getTransactions();
  };

  const getTransactions = async function() {
    const transactionResponse = await fetch('/server/token/transactions');
    const transactionData = await transactionResponse.json();
    const simplifiedData = transactionData.transactions.map((item) => {
      return {
        date: item.date,
        name: item.name,
        amount: '$${item.amount.toFixed(2)}',
        categories: item.category.join(", "),
      };
    });
    console.table(simplifiedData);
    // html stuff
    
  }

  // oauth-return.js functions
  function finishOAuth() {
    const storedTokenData = localStorage.getItem("linkTokenData");
    console.log(`I retrieved ${storedTokenData} from local storage`);
    const linkTokenData = JSON.parse(storedTokenData);

    const handler = Plaid.create({
      token: linkTokenData.link_token,
      receivedRedirectUri: window.location.href,
      onSuccess: async (publicToken, metadata) => {
        console.log(
          `I have a public token: ${publicToken} I should exchange this`
        );
        await exchangeToken(publicToken);
      },
      onExit: (err, metadata) => {
        console.log(
          `I'm all done. Error: ${JSON.stringify(err)} Metadata: ${JSON.stringify(
            metadata
          )}`
        );
        if (err !== null) {
          // html stuff
        }
      },
      onEvent: (eventName, metadata) => {
        console.log(`Event ${eventName}`);
      },
    });
    handler.open();
  }  

  return (
    <div className="confirmation-container">
      <Helmet>
        <title>Confirmation - Profiteer</title>
        <meta property="og:title" content="Confirmation - Profiteer" />
      </Helmet>
      <div className="confirmation-container1">
        <div className="confirmation-background">
          <div className="confirmation-image1">
            <div className="confirmation-container2">
              <h1 className="confirmation-text profiteerheadings">
                Account successfully created!
              </h1>
              <h1 className="confirmation-text01 profiteerheadings">
                <span>You are now ready to begin</span>
                <br></br>
                <span>your financial journey with Profiteer!</span>
              </h1>
            <Link to="/dashboard" className="confirmation-register button">
              <span className="confirmation-text05">Access Dashboard</span>
            </Link>
            </div>
          </div>
          <div className="confirmation-container3">
            <span className="confirmation-text06">© Profiteer 2024</span>
          </div>
          <header data-thq="thq-navbar" className="confirmation-navbar">
            <Link to="/" className="confirmation-navlink">
              <h2 className="confirmation-text07">Profiteer</h2>
            </Link>
            <div
              data-thq="thq-navbar-nav"
              data-role="Nav"
              className="confirmation-desktop-menu"
            >
              <nav
                data-thq="thq-navbar-nav-links"
                data-role="Nav"
                className="confirmation-nav"
              >
                <Link to="/about" className="confirmation-link navLink">
                  About Us
                </Link>
              </nav>
              <Link to="/sign-in" className="confirmation-register1 button">
                <span className="confirmation-text08">Log In</span>
              </Link>
              <Link to="/register" className="confirmation-register2 button">
                <span className="confirmation-text09">Sign Up</span>
              </Link>
            </div>
            <div
              data-thq="thq-burger-menu"
              className="confirmation-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="confirmation-icon">
                <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div
              data-thq="thq-mobile-menu"
              className="confirmation-mobile-menu"
            >
              <div
                data-thq="thq-mobile-menu-nav"
                data-role="Nav"
                className="confirmation-nav1"
              >
                <div className="confirmation-container4">
                  <h2 className="confirmation-text10">OnConf</h2>
                  <div
                    data-thq="thq-close-menu"
                    className="confirmation-menu-close"
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      className="confirmation-icon02"
                    >
                      <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                    </svg>
                  </div>
                </div>
                <nav
                  data-thq="thq-mobile-menu-nav-links"
                  data-role="Nav"
                  className="confirmation-nav2"
                >
                  <span className="navLink confirmation-text11">About</span>
                  <span className="navLink confirmation-text12">Features</span>
                  <span className="navLink confirmation-text13">Pricing</span>
                  <span className="navLink confirmation-text14">Team</span>
                  <span className="navLink confirmation-text15">Blog</span>
                </nav>
                <div className="confirmation-button-container">
                  <button className="confirmation-login button">Login</button>
                  <button className="button confirmation-register3">
                    Register
                  </button>
                </div>
                <div className="confirmation-icon-group">
                  <div className="confirmation-icons">
                    <svg
                      viewBox="0 0 950.8571428571428 1024"
                      className="confirmation-icon04"
                    >
                      <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 877.7142857142857 1024"
                      className="confirmation-icon06"
                    >
                      <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 602.2582857142856 1024"
                      className="confirmation-icon08"
                    >
                      <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img
                alt="image"
                src="/quote-background.svg"
                className="confirmation-background1"
              />
            </div>
          </header>
        </div>
      </div>
    </div>
  )
}

export default Confirmation