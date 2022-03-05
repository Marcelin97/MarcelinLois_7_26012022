const { user } = require("../models");
const { community } = require("../models");
require("dotenv").config();
const CryptoJS = require("crypto-js");
// Import the filesystem module
const fs = require("fs");
const path = require("path");

exports.create = (req, res)=>{
    // return res.status(201).json();
        return res.status(201).json({ message: "Welcome." });

}