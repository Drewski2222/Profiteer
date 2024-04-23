require("dotenv").config();
const PLAID_ENV = (process.env.PLAID_ENV || "sandbox").toLowerCase();
const { Configuration, PlaidEnvironments, PlaidApi } = require("plaid");
const clientId = process.env.PLAID_CLIENT_ID;
const secretId = process.env.PLAID_SECRET;

// Set up the Plaid client library
const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": clientId,
      "PLAID-SECRET": secretId,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const plaidClient = new PlaidApi(plaidConfig);

module.exports = { plaidClient };

console.log('Plaid Setup Complete');

