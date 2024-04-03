// // THIS FILE NEEDS TO BE REFACTORED TO MONGO
// const fs = require("fs");
// const crypto = require("crypto");
const { SimpleTransaction } = require("./simpleTransactionObject");
const server = require("./server.js");

// // You may want to have this point to different databases based on your environment
// const databaseFile = "./database/appdata.db";
// let db;

// // Set up our database


// const debugExposeDb = function () {
//   return db;
// };

const getItemIdsForUser = async function (userId) {
  let ids = [];

  const query = {
    _id: userId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const user = await userInfo.findOne(query);

  for (let i = 0; i < user.items.length; i++){
    ids.push(user.items[i].item.item_id);
  }

  console.log(ids);
};

const getItemsAndAccessTokensForUser = async function (userId) {
  const query = {
    _id: userId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const user = await userInfo.findOne(query);

  return user.items;
};

// const getAccountIdsForItem = async function (itemId) {
//   const accounts = await db.all(
//     `SELECT id FROM accounts WHERE item_id = ?`,
//     itemId
//   );
//   return accounts;
// };

const confirmItemBelongsToUser = async function (possibleItemId, userId) {
  const query = {
    _id: userId,
    "items.item.item_id": possibleItemId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const result = await userInfo.findOne(query);

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

// const deactivateItem = async function (itemId) {
//   const updateResult = await db.run(
//     `UPDATE items SET access_token = 'REVOKED', is_active = 0 WHERE id = ?`,
//     itemId
//   );
//   return updateResult;
//   // If your user wanted all the data associated with this bank removed, you
//   // could...
//   // - Delete transactions for accounts belonging to this item
//   // - Delete accounts that belong to this item
//   // - Delete the item itself from the database
// };

const addUser = async function (userId, email, password, username) {

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");

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

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");

  const query = {
    email: email,
    password: password,
  }

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
  let i_ids = [];

  const query = {
    _id: userId,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const user = await userInfo.findOne(query);

  for (let i = 0; i < user.items.length; i++){
    i_ids.push(user.items[i].item.institution_id);
  }

  // make API request to get name from id addBankNameForItem()

  return i_ids;
};

const addItem = async function (itemId, userId, accessToken) {
  const query = {
    _id: userId,
  }
  const push = {
    $push: {
      items: {
        item_id: itemId,
        access_token: accessToken,
      }
    }
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const result = await userInfo.updateOne(query, push);

  return result;
};

// const addBankNameForItem = async function (itemId, institutionName) {
//   const result = await db.run(
//     `UPDATE items SET bank_name=? WHERE id =?`,
//     institutionName,
//     itemId
//   );
//   return result;
// };

// const addAccount = async function (accountId, itemId, acctName) {
//   await db.run(
//     `INSERT OR IGNORE INTO accounts(id, item_id, name) VALUES(?, ?, ?)`,
//     accountId,
//     itemId,
//     acctName
//   );
// };

const getItemInfo = async function (itemId) {
  const query = {
    "items.item.item_id": itemId,
  }
  const proj = {
    "items.item": 1,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const result = await userInfo.find(query, proj);

  return result;
};

const getItemInfoForUser = async function (itemId, userId) {
  const query = {
    _id: userId,
    "items.item.item_id": itemId,
  }
  const proj = {
    "items.item": 1,
  }

  const client = server.client;
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const result = await userInfo.findOne(query, proj);

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
    'items.item.item_id': itemId,
  }
  const set = {
    $set: {
      'items.$.item.transaction_cursor': transactionCursor,
    }
  }
  try {
    const client = server.client;
    const appdata = client.db("appdata");
    const userInfo = appdata.collection("userInfo");
    const result = await userInfo.updateOne(query, set);
  } catch (error) {
    console.error(
      `It's a big problem that I can't save my cursor. ${JSON.stringify(error)}`
    );
  }
};

module.exports = {
  // debugExposeDb,
  getItemIdsForUser,
  getItemsAndAccessTokensForUser,
  // getAccountIdsForItem,
  confirmItemBelongsToUser,
  // deactivateItem,
  addUser,
  findUser,
  // getUserList,
  // getUserRecord,
  getBankNamesForUser,
  addItem,
  // addBankNameForItem,
  // addAccount,
  getItemInfo,
  getItemInfoForUser,
  addNewTransaction,
  modifyExistingTransaction,
  deleteExistingTransaction,
  // markTransactionAsRemoved,
  getTransactionsForUser,
  saveCursorForItem,
};