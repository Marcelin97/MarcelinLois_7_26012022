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

  let { firstName, lastName, username, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  // const emailCrypted = encrypted(req.body.email);

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
        user
      })
      .catch((err) => {
        return res.status(400).json({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });
        res.status(200).send({
          user,
          accessToken: token,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {};
// Find a single User with an id
exports.findOne = (req, res) => {};
// Update a User by the id in the request
exports.update = (req, res, next) => {
let { firstName, lastName, email } = req.body;
let id = req.params.id;
  
User.findOne(id)
  .then((user) => {
    if (user) {
      user.update({ firstName, lastName, email }).then((updateUser) => {
        return res.status(202).json({
          message: "User updated successfully",
          updateUser,
        });
      });
    } else {
      return res.status(206).json({
        message: "User not found",
      });
    }
  })
  .catch((error) => {
    return res.status(400).json({
      error: error,
    });
  });

};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {};
