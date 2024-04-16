// // THIS FILE NEEDS TO BE REFACTORED TO MONGO
// const fs = require("fs");
// const crypto = require("crypto");
const { SimpleTransaction } = require("./simpleTransactionObject");
const server = require("./server.js");
const { LinkTokenCreateRequestAuthFlowTypeEnum } = require("plaid");

// // You may want to have this point to different databases based on your environment
// const databaseFile = "./database/appdata.db";
// let db;

// // Set up our database


// const debugExposeDb = function () {
//   return db;
// };

const getItemIdsForUser = async function (userId) {
  const query = {
    user_id: userId,
  };

  const proj = {
    _id: 0,
    item_id: 1,
  };

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  //const itemIds = await items.findMany(query, proj);
  const itemIds = await items.find().toArray(query, proj);

  return itemIds;
};

const getItemsAndAccessTokensForUser = async function (userId) {
  const query = {
    user_id: userId,
  };

  const proj = {
    _id: 0,
    item_id: 1,
    access_token: 1,
  };

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  const itemAccessTokens = await items.findMany(query, proj);

  return itemAccessTokens;
};

const getAccountIdsForItem = async function (itemId) {
  const query = {
    item_id: itemId,
  };

  const proj = {
    _id: 0,
    account_id: 1,
  };

  const client = server.client;
  const appdata = client.db("appdata");
  const accounts = appdata.collection("accounts");
  const accountIds = await accounts.findMany(query, proj);

  return accountIds;
};

const confirmItemBelongsToUser = async function (possibleItemId, userId) {
  const query = {
    user_id: userId,
    item_id: possibleItemId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  const result = await items.findOne(query);

  console.log(result);
  if (result === undefined) {
    console.warn(
      `User ${userId} claims to own item they don't: ${possibleItemId}`
    );
    return false;
  } else {
    return true;
  }
};

const deleteItem = async function (itemId, deleteAccounts, deleteTransactions) {
  const query = {
    item_id: itemId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  let result = {};

  if (deleteAccounts) {
    const accounts = appdata.collection("accounts");
    result.accounts_delete = await accounts.deleteMany(query);
  }
  if (deleteTransactions) {
    const transactions = appdata.collection("transactions");
    result.transactions_delete = await transactions.deleteMany(query);
  }
  result.item_delete = await items.deleteOne(query);

  return result;
};

const deleteAccount = async function (accountId, deleteTransactions) {
  const query = {
    account_id: accountId,
  }

  let result = {};

  const client = server.client;
  const appdata = client.db("appdata");
  const accounts = appdata.collection("accounts");

  if (deleteTransactions) {
    const transactions = appdata.collection("transactions");
    result.transactions_delete = await transactions.deleteMany(query);
  }

  result.account_delete = await accounts.deleteOne(query);

  return result;
}

const addUser = async function (userId, email, password, username) {

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  let find = null;

  let query = {
    email: email,
  }

  find = await userInfo.findOne(query);
  if (find != null && find.email == email) return {
    error_code: 600,
    error_message: "Account with that email already exists",
  };

  query = {
    username: username,
  }

  find = await userInfo.findOne(query);
  if (find != null && find.username == username) return {
    error_code: 601,
    error_message: "Account with that username already exists",
  };

  const doc = {
    user_id: userId,
    email: email,
    password: password,
    username: username,
  }

  const result = await userInfo.insertOne(doc);
  
  return result;
};

const findUser = async function (email, password) {
  const query = {
    email: email,
    password: password,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");

  const result = await userInfo.findOne(query);
  
  return result;
};

// const getUserList = async function () {
//   const result = await db.all(`SELECT id, username FROM users`);
//   return result;
// };

// const getUserRecord = async function (userId) {
//   const result = await db.get(`SELECT * FROM users WHERE id=?`, userId);
//   return result;
// };

const getBankNamesForUser = async function (userId) {
  const query = {
    user_id: userId,
  }

  const proj = {
    _id: 0,
    institution_id: 1,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  const institutionIds = await items.findMany(query, proj);

  // make API request to get name from id addBankNameForItem()

  return institutionNames;
};

const addItem = async function (itemId, userId, accessToken) {
  const item = {
    user_id: userId,
    item_id: itemId,
    access_token: accessToken,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  const result = await items.insertOne(item);

  return result;
};

const addBankNameForItem = async function (itemId, institutionName) {
  const result = await db.run(
    `UPDATE items SET bank_name=? WHERE id =?`,
    institutionName,
    itemId
  );
  return result;
};

const addAccount = async function (accountId, itemId, accountName) {
  const account = {
    account_id: accountId,
    item_id: itemId,
    account_name: accountName,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const accounts = appdata.collection("accounts");
  const result = await accounts.insertOne(account);

  return result;
};

const getItemInfo = async function (itemId) {
  const query = {
    item_id: itemId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  const result = await items.findOne(query);

  return result;
};

const getItemInfoForUser = async function (userId) {
  const query = {
    user_id: userId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const items = appdata.collection("items");
  const result = await items.findMany(query);

  return result;
};

/**
 * Add a new transaction to our database
 *
 * @param {SimpleTransaction} transactionObj
 */
const addNewTransaction = async function (transactionObj) {
  const transaction = {
    user_id: transactionObj.userId,
    account_id: transactionObj.accountId,
    transaction_id: transactionObj.transactionId,
    pending: transactionObj.pending,
    pending_transaction_id: transactionObj.pendingTransactionId,
    personal_finance_category: transactionObj.personalFinanceCategory,
    date: transactionObj.date,
    authorized_date: transactionObj.authorizedDate,
    merchant_name: transactionObj.merchantName,
    amount: transactionObj.amount,
    iso_currency_code: transactionObj.isoCurrencyCode,
  }
  try {
    const client = server.client;
    const appdata = client.db("appdata");
    const transactions = appdata.collection("transactions");
    const result = await transactions.insertOne(transaction);

    if (transactionObj.pendingTransactionId != null) {
      // This might be a good time to copy over any user-created values from
      // that other transaction to this one.
    }

    return result;
  } catch (error) {
    console.log(
      `Looks like I'm encountering an error. ${JSON.stringify(error)}`
    );
  }
};

/**
 * Modify an existing transaction in our database
 *
 * @param {SimpleTransaction} transactionObj
 */
const modifyExistingTransaction = async function (transactionObj) {
  const query = {
    transaction_id: transactionObj.transactionId,
  }
  const transaction = {
    user_id: transactionObj.userId,
    account_id: transactionObj.accountId,
    pending: transactionObj.pending,
    pending_transaction_id: transactionObj.pendingTransactionId,
    personal_finance_category: transactionObj.personalFinanceCategory,
    date: transactionObj.date,
    authorized_date: transactionObj.authorizedDate,
    merchant_name: transactionObj.merchantName,
    amount: transactionObj.amount,
    iso_currency_code: transactionObj.isoCurrencyCode,
  }
  try {
    const client = server.client;
    const appdata = client.db("appdata");
    const transactions = appdata.collection("transactions");
    const result = await transactions.updateOne(query, transaction);

    return result;
  } catch (error) {
    console.log(
      `Looks like I'm encountering an error. ${JSON.stringify(error)}`
    );
  }
};

// /**
//  * Mark a transaction as removed from our database
//  *
//  * @param {string} transactionId
//  */
// const markTransactionAsRemoved = async function (transactionId) {
//   try {
//     const updatedId = transactionId + "-REMOVED-" + crypto.randomUUID();
//     const result = await db.run(
//       `UPDATE transactions SET id = ?, is_removed = 1 WHERE id = ?`,
//       updatedId,
//       transactionId
//     );
//     return result;
//   } catch (error) {
//     console.log(
//       `Looks like I'm encountering an error. ${JSON.stringify(error)}`
//     );
//   }
// };

/**
 * Actually delete a transaction from the database
 *
 * @param {string} transactionId
 */
const deleteExistingTransaction = async function (transactionId) {
  const query = {
    transaction_id: transactionId,
  }
  try {
    const client = server.client;
    const appdata = client.db("appdata");
    const transactions = appdata.collection("transactions");
    const result = await transactions.deleteOne(query);

    return result;
  } catch (error) {
    console.log(
      `Looks like I'm encountering an error. ${JSON.stringify(error)}`
    );
  }
};

/**
 * Fetch transactions for our user from the database
 *
 * @param {string} userId
 * @param {number} maxNum
 */
const getTransactionsForUser = async function (userId) {
  const query = {
    user_id: userId,
  }
  const client = server.client;
  const appdata = client.db("appdata");
  const transactions = appdata.collection("transactions");
  const result = await transactions.findMany(query);
  return result;
};

/**
 * Save our cursor to the database
 *
 * @param {string} transactionCursor
 * @param {string} itemId
 */
const saveCursorForItem = async function (transactionCursor, itemId) {
  const query = {
    item_id: itemId,
  }
  const cursor = {
    transaction_cursor: transactionCursor,
  }

  try {
    const client = server.client;
    const appdata = client.db("appdata");
    const userInfo = appdata.collection("userInfo");
    const result = await userInfo.updateOne(query, cursor);

    return result;
  } catch (error) {
    console.error(
      `It's a big problem that I can't save my cursor. ${JSON.stringify(error)}`
    );
  }
};

/**
 * Aggregate transactions for each user based on optional filters
 * 
 * @param {string} userId
 * @param {string} personalFinanceCategory
 * @param {string} dateRangeStart
 * @param {string} dateRangeEnd
 * @param {string} pending
 * @param {string} merchantName
 * @param {string} amountRangeStart
 * @param {string} amountRangeEnd
 */
const aggregateTransactions = async function (userId, personalFinanceCategory, dateRangeStart, dateRangeEnd, pending, merchantName, amountRangeStart, amountRangeEnd) {
  query = {
    user_id: userId,
  }
  
  if (personalFinanceCategory != undefined){
    query.personal_finance_category = personalFinanceCategory;
  }
  if (dateRangeStart != undefined && dateRangeEnd != undefined){
    query.date = {$gte: ISODate(dateRangeStart), $lte: ISODate(dateRangeEnd)};
  }
  if (dateRangeStart != undefined){
    query.date = {$gte: ISODate(dateRangeStart)};
  }
  if (dateRangeEnd != undefined){
    query.date = {$lte: ISODate(dateRangeEnd)};
  }
  if (pending != undefined){
    query.pending = pending;
  }
  if (merchantName != undefined){
    query.merchant_name = merchantName;
  }
  if (amountRangeStart != undefined && amountRangeEnd != undefined){
    query.amount = {$gte: amountRangeStart, $lte: amountRangeEnd};
  }
  if (amountRangeStart != undefined){
    query.amount = {$gte: amountRangeEnd};
  }
  if (amountRangeEnd != undefined){
    query.amount = {$lte: amountRangeEnd};
  }

  try {

    const client = server.client;
    const appdata = client.db("appdata");
    const transactions = appdata.collection("transactions");
    const cursor = await transactions.find(query);

  var result = 0;
  for await (trans of cursor){
    result += trans.amount;
  }
  return result;

  } catch (error) {
    console.error(
      `Looks like I'm encountering an error. ${JSON.stringify(error)}`
    );
  }
}

module.exports = {
  // debugExposeDb,
  getItemIdsForUser,
  getItemsAndAccessTokensForUser,
  getAccountIdsForItem,
  confirmItemBelongsToUser,
  deleteItem,
  deleteAccount,
  addUser,
  findUser,
  // getUserList,
  // getUserRecord,
  getBankNamesForUser,
  addItem,
  // addBankNameForItem,
  addAccount,
  getItemInfo,
  getItemInfoForUser,
  addNewTransaction,
  modifyExistingTransaction,
  deleteExistingTransaction,
  // markTransactionAsRemoved,
  getTransactionsForUser,
  saveCursorForItem,
  aggregateTransactions,
};