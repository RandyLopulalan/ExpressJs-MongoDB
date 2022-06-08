const path = require("path");
const fs = require("fs");
const Product = require("./model");

// GET all
const index = async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
};

// GET id
const view = async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
};

// PUSH
const store = async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
      const target = path.join(__dirname, "../../uploads", image.originalname);
      fs.renameSync(image.path, target);
      const result = await Product.create({
        name,
        price,
        stock,
        status,
        image_url: `https//localhost:3000/public/${image.originalname}`,
      });

      res.send(result);
    }
  } catch (e) {
    console.log(e.message);
  }
};

// PUT
const update = async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
      const target = path.join(__dirname, "../../uploads", image.originalname);
      fs.renameSync(image.path, target);
      const result = await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        stock,
        status,
        image_url: `https//localhost:3000/public/${image.originalname}`,
      });
      res.send({status: "update data succes"});
    }
  } catch (e) {
    console.log(e.message);
  }
};

// DELETE
const deleteData = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    res.send({
      status: "delete data succes",
      respond: result,
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { index, view, store, update, deleteData };
