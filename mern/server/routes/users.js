const express = require("express");
const escape = require("escape-html");
const { v4: uuidv4 } = require("uuid");
const { getLoggedInUserId } = require("../utils");
const db = require("../db");

const router = express.Router();

/**
 * Methods and endpoints for signing in, signing out, and creating new users.
 * For the purpose of this sample, we're simply setting / fetching a cookie that
 * contains the userID as our way of getting the ID of our signed-in user.
 */
router.post("/register", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const userId = uuidv4();

    const result = await db.addUser(userId, email, password, username);

    console.log(`User registration result is ${JSON.stringify(result)}`);
    if (result["acknowledged"] == true) {
      res.cookie("signedInUser", userId, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
    }
    else if (result.error_code == 600 || result.error_code == 601) {
      throw {
        response: {
          data: result.error_message,
        }
      }
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/sign-in", async (req, res, next) => {
  try {
    const email = escape(req.body.email);
    const password = escape(req.body.password);

    const result = await db.findUser(email, password);

    console.log(`User sign-in result is ${JSON.stringify(result)}`);
    if (result["email"] == email && result["password"] == password) {
      res.cookie("signedInUser", result["user_id"], {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/list", async (req, res, next) => {
  try {
    const result = await db.getUserList();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/sign_in", async (req, res, next) => {
  try {
    const userId = escape(req.body.userId);
    res.cookie("signedInUser", userId, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.json({ signedIn: true });
  } catch (error) {
    next(error);
  }
});

router.post("/sign_out", async (req, res, next) => {
  try {
    res.clearCookie("signedInUser");
    res.json({ signedOut: true });
  } catch (error) {
    next(error);
  }
});

/**
 * Get the id and username of our currently logged in user, if any.
 */
router.get("/get_my_info", async (req, res, next) => {
  try {
    const userId = getLoggedInUserId(req);
    console.log(`Your userID is ${userId}`);
    let result;
    if (userId != null) {
      const userObject = await db.getUserRecord(userId);
      if (userObject == null) {
        // This probably means your cookies are messed up.
        res.clearCookie("signedInUser");
        res.json({ userInfo: null });
        return;
      } else {
        result = { id: userObject.id, username: userObject.username };
      }
    } else {
      result = null;
    }
    res.json({ userInfo: result });
  } catch (error) {
    next(error);
  }
});

/**
 * Get the aggregated transaction data for a user based on specified filters
 */
router.get("/agg_data", async (req, res, next) => {
  try{
    // const userId = getLoggedInUserId(req);
    //testing
    const userId = "001"
    console.log(`Your userID is ${userId}`);

    const personalFinanceCategory = req.query.personalFinanceCategory;
    const dateRangeStart = req.query.dateRangeStart;
    const dateRangeEnd = req.query.dateRangeEnd;
    const pending = req.query.pending;
    const merchantName = req.query.merchantName;
    const amountRangeStart = req.query.amountRangeStart;
    const amountRangeEnd = req.query.amountRangeEnd;

    const result = await db.aggregateTransactions(userId, personalFinanceCategory, dateRangeStart, dateRangeEnd, pending, merchantName, amountRangeStart, amountRangeEnd);

    res.json({ agg_data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;