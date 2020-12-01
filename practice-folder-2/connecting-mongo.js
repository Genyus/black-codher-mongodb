// in order to connect nodejs with mongo
const { MongoClient } = require("mongodb");
const { allowedNodeEnvironmentFlags } = require("process");
// >>>>> const client = new MongoClient(uri);
// the URI is the connection string used to access to the database
// to connect to the local instance of mongodb we ca use ...
// >>>>> const uri = "mongodb://localhost:27017";

// FUNCTION TO CONNECT TO THE DATABASE
async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Conected to Local Database");
    let databaseList = await client.db().admin().listDatabases();
    console.log("Databases");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main().catch(console.error);

// To access our film collection in the movie database the call would be:
// client.db('movie').collection('film).find({})
// > use movie; db.film.find({});
