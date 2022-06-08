const { MongoClient } = require("mongodb");

const url = "mongodb://eduwork:123@localhost:27017?authSource=admin";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("koneksi ke mongodb berhasil");
  } catch (err) {
    console.log(err);
  }
})();

const db = client.db('eduwork-native');

module.exports = db;
