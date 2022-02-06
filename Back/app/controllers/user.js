//on a besoin de notre model users
const User = require("../models/user");

// package de cryptage du MDP
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
    console.log('Test signup');
};