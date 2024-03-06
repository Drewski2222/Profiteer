const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const { ObjectId } = require("mongodb");
const conn = require("./db/conn");
const db = require("./db.js");

app.listen(port, () => {
  // perform a database connection when server starts
  exports.client = conn.connectClient();
  //conn.getFirstName();
  db.getItemIdsForUser(new ObjectId('65e10fd3b7e92e98bd08a307'));
  console.log(`Server is running on port: ${port}`);
});



const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// // Set up the server

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static("./public"));

// const usersRouter = require("./routes/users");
// const linkTokenRouter = require("./routes/tokens");
// const bankRouter = require("./routes/banks");
// const { router: transactionsRouter } = require("./routes/transactions");
// const debugRouter = require("./routes/debug");
// const { getWebhookServer } = require("./webhookServer");

// app.use("/server/users", usersRouter);
// app.use("/server/tokens", linkTokenRouter);
// app.use("/server/banks", bankRouter);
// app.use("/server/transactions", transactionsRouter);
// app.use("/server/debug", debugRouter);

// /* Add in some basic error handling so our server doesn't crash if we run into
//  * an error.
//  */
// const errorHandler = function (err, req, res, next) {
//   console.error(`Your error:`);
//   console.error(err);
//   if (err.response?.data != null) {
//     res.status(500).send(err.response.data);
//   } else {
//     res.status(500).send({
//       error_code: "OTHER_ERROR",
//       error_message: "I got some other message on the server.",
//     });
//   }
// };
// app.use(errorHandler);

// // Initialize our webhook server, too.
// const webhookServer = getWebhookServer();