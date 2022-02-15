const db = require("../models"); // models path
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CryptoJS = require("crypto-js");

//=================================>
/////////////////// ENCRYPTED EMAIL
//=================================>
function encrypted(email) {
  return CryptoJS.AES.encrypt(
    email,
    CryptoJS.enc.Base64.parse(process.env.PASSPHRASE),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
}
//=================================>
/////////////////// ENCRYPTED EMAIL
//=================================>

//=================================>
/////////////////// DECRYPT EMAIL
//=================================>
function decryptEmail(email) {
  var bytes = CryptoJS.AES.decrypt(
    email,
    CryptoJS.enc.Base64.parse(process.env.PASSPHRASE),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}
//=================================>
/////////////////// DECRYPT EMAIL
//=================================>

exports.signup = (req, res, next) => {
  if (!req.body.username && !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let { firstName, lastName, username } = req.body;
  const email = encrypted(req.body.email);
  const password = bcrypt.hashSync(req.body.password, 10);

  User.create({
    username,
    firstName,
    lastName,
    email,
    password,
  }).then((user) => {
    return res
      .status(201)
      .json({
        message: "User created successfully",
        user,
      })
      .catch((err) => {
        return res.status(400).json({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  });
};

exports.login = (req, res, next) => {
  console.log("Test");
  res.send({ message: "Login successfully!" });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {};
// Find a single User with an id
exports.findOne = (req, res) => {};
// Update a User by the id in the request
exports.update = (req, res) => {};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {};
