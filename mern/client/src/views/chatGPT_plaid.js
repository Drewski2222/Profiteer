import React from 'react'; 
import { Link } from 'react-router-dom';

//import { Helmet } from 'react-helmet';

//import { bool } from 'prop-types';

const PlaidIntegration = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleOnSuccess = (publicToken, metadata) => {
    // Send the publicToken to your server to exchange for an access_token
    // and store it in state
    fetch('/server/token/generate_link_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_token: publicToken,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setAccessToken(data.access_token);
      })
      .catch(error => console.error('Error exchanging token:', error));
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <h2>Plaid Integration Successful!</h2>
          {/* Display user's financial data using accessToken */}
        </div>
      ) : (
        <PlaidLink
          clientName="Your Client Name"
          env="sandbox" // or 'development', 'sandbox', 'production'
          product={['auth', 'transactions']}
          publicKey="Your Public Key"
          onSuccess={handleOnSuccess}
        >
          Connect your bank account
        </PlaidLink>
      )}
    </div>
  );
};

export default PlaidIntegration;
