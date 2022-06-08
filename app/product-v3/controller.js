const { ObjectID } = require("bson");
const db = require("../../config/mongodb");
const path = require("path");
const fs = require("fs");

// GET all
const index = (req, res) => {
  db.collection("products")
    .find()
    .toArray()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

// GET id
const view = (req, res) => {
  const { id } = req.params;
  db.collection("products")
    .findOne({ _id: ObjectID(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

// PUSH
const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    db.collection("products")
      .insertOne({
        name,
        price,
        stock,
        status,
        image_url: `https//localhost:3000/public/${image.originalname}`,
      })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

// PUT
const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    db.collection("products")
      .updateOne(
        { _id: ObjectID(req.params.id) },
        {
          $set: {
            name,
            price,
            stock,
            status,
            image_url: `https//localhost:3000/public/${image.originalname}`,
          },
        }
      )
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

// DELETE
const deleteData = (req, res) => {
  db.collection("products").deleteOne({ _id: ObjectID(req.params.id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = { index, view, store, update, deleteData };
