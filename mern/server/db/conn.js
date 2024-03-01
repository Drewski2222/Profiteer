const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
 
var _db;
 
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

const conn = async function () {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    getJohnny();
    // Send a ping to confirm a successful connection
    await client.db("appdata").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    // Exit process with failure
    process.exit(1);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getJohnny(){
  const appdata = client.db("appdata");
  const userInfo = appdata.collection("userInfo");
  const query = {
    first_name: "Johnny",
  }

  const user = await userInfo.findOne(query);

  console.log(user);
}

module.exports = conn;