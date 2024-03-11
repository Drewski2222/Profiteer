import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './register.css';

const Register = (props) => {
  // state to hold email, password, and confirm password values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if passwords match
    if (password !== confirmPassword) {
      window.alert('Error: Passwords do not match.');
      return;
    }

    // passwords match
    console.log('Form submitted:', { email, password });
    // send data to backend
  };

  return (
    <div className="register-container">
      <Helmet>
        <title>Register - Profiteer</title>
        <meta property="og:title" content="Register - Profiteer" />
      </Helmet>
      <div className="register-container1">
        <span className="register-text Bold26">
          <span>Profiteer</span>
        </span>
      </div>
      <div className="register-container2">
        <form onSubmit={handleSubmit} className="register-background">
          <div className="register-image1">
            <div className="register-container3">
              <span className="register-text02 profiteerheadings">
                Ready to Begin Your Financial Journey?
              </span>
              <span className="register-text03">
                <span>Email</span>
              </span>
              <div className="register-rectangle5">
                <input
                  type="email"
                  className="register-textinput input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span className="register-text05">
                <span>Password</span>
              </span>
              <div className="register-rectangle7">
                <input
                  type="password"
                  className="register-pass input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span className="register-text07">
                <span>Confirm Password</span>
                <br />
              </span>
              <div className="register-rectangle71">
                <input
                  type="password"
                  className="register-pass-conf input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="register-register button">
                <span className="register-text10">Register Now</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
