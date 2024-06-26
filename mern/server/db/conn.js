const { MongoClient } = require("mongodb");
const uri = 'mongodb+srv://trevorgross:S1ejkC1380RPdh8N@profiteerdb.v3zfcrx.mongodb.net/?retryWrites=true&w=majority&appName=profiteerdb';
var client;
var appdata;
var userInfo;
// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri);
 
// var _db;
 
// module.exports = {
//   connectToServer: function (callback) {
//     async function run() {
//       try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();

        
//         // Send a ping to confirm a successful connection
//         await client.db("appdata").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");

//         const findResult = client.db("appdata").collection("userInfo").find({
//           first_name: "Johnny"
//         });
//         console.log(findResult);
//         for await (const doc of findResult) {
//           console.log(doc);
//         }

//       } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//       }
//     }
//     // client.connect(function (err, db) {
//     //   // Verify we got a good "db" object
//     //   if (db)
//     //   {
//     //     _db = db.db("appdata");
//     //     console.log("Successfully connected to MongoDB."); 
//     //   }
//     //   return callback(err);
//     //      });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };

// const run = async function () {
//   try {
//     await client.connect();
//     // Get the database and collection on which to run the operation
//     const appdata = client.db("appdata");
//     const userInfo = appdata.collection("userInfo");
//     // Execute query
//     const user = getFirstName(userInfo, "Johnny");
//     // Print the document returned by findOne()
//     console.log(user);
//   } finally {
//       await client.close();
//   }
// }
// run().catch(console.dir);

function connectClient() {
      const options = {};

      client = new MongoClient(uri, options);
      client.connect();
      appdata = client.db("appdata");
      userInfo = appdata.collection("userInfo");
      console.log("Successfully connected to MongoDB.");

  return client
}

function getClient() {
  return client;
}

async function getFirstName(){
  const query = {
    first_name: "Johnny",
  }

  // const appdata = client.db("appdata");
  // const userInfo = appdata.collection("userInfo");
  const user = await userInfo.findOne(query);

  console.log(user);
}

exports.connectClient = connectClient;
exports.getFirstName = getFirstName;
exports.getClient = getClient;
exports.appdata = appdata;
exports.userInfo = userInfo;