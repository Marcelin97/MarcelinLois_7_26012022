const db = require("../models"); // models path
const User = db.user;
const Op = db.Sequelize.Op;

// // package de cryptage du MDP
// const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  console.log("Test signup");
  res.send({ message: "Signup successfully!" });
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
