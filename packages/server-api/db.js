const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

async function getDB() {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    console.log("ERR WHILE CREATING COLLECTION !!!");
    return;
  }

  try {
    const db = client.db("testdb");
    return db;

    // let collection = db.collection("cars");
    // let query = { name: "Volkswagen" };
    // let res = await collection.findOne(query);
    // console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

module.exports = {
  getDB,
};
