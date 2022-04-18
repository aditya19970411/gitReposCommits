const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const database = "testDB";
const collectionName = "repos";

async function findIfExists(username) {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });
  try {
    if (!client) {
      console.log("ERR WHILE CREATING COLLECTION !!!");
      return;
    }
    const db = client.db(database);
    const collection = db.collection(collectionName);
    const repos = await collection.find({ username }).toArray();
    if (!repos || repos === null || repos.length === 0) return;
    return repos;
  } catch (err) {
    console.log("ERROR", err);
  } finally {
    client.close();
  }
}

async function insertIfNotExists(values) {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });
  try {
    const db = client.db(database);
    const collection = db.collection(collectionName);
    const inserted = await collection.insertMany(values);
    return inserted;
  } catch (err) {
    console.log("ERROR", err);
  } finally {
    client.close();
  }
}

module.exports = {
  findIfExists,
  insertIfNotExists,
};
