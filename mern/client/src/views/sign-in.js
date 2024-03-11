import React from 'react'

import { Helmet } from 'react-helmet'

import './sign-in.css'

const SignIn = (props) => {
  return (
    <div className="sign-in-container">
      <Helmet>
        <title>Sign-In - Profiteer</title>
        <meta property="og:title" content="Sign-In - Profiteer" />
      </Helmet>
      <div className="sign-in-container1">
        <span className="sign-in-text Bold26">
          <span>Profiteer</span>
        </span>
      </div>
      <div className="sign-in-container2">
        <div className="sign-in-background">
          <div className="sign-in-image1">
            <div className="sign-in-container3">
              <h1 className="sign-in-text2 profiteerheadings">
                Welcome Back, Profiteer!
              </h1>
              <span className="sign-in-text3">
                <span>Email</span>
              </span>
              <div className="sign-in-rectangle5">
                <input type="email" className="sign-in-textinput input" />
              </div>
              <span className="sign-in-text5">
                <span>Password</span>
              </span>
              <div className="sign-in-rectangle7">
                <input type="password" className="sign-in-textinput1 input" />
              </div>
              <button type="submit" className="sign-in-register button">
                <span className="sign-in-text7">Log In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
