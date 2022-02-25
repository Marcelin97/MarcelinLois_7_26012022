const { user } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CryptoJS = require("crypto-js");
// Import the filesystem module
const fs = require("fs");
const path = require("path");

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

// check if the string is an email.
function validateEmail(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

// Signup a user
exports.signup = (req, res, next) => {
  if (!req.body.username && !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let { firstName, lastName, username } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const emailCrypted = encrypted(req.body.email);

  user
    .create({
      username,
      firstName,
      lastName,
      email: emailCrypted,
      password,
    })
    .then((user) => {
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

// Connected a user
exports.login = (req, res) => {
  var emailEncrypted = encrypted(req.body.email);
  user
    .findOne({
      where: {
        email: emailEncrypted,
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

// Read user info
exports.readUser = async (req, res) => {
  user
    .findOne({
      include: {
        all: true,
      },
      where: {
        id: req.auth.userID,
      },
    })
    .then((datas) => {
      var emailEncrypted = datas.email;
      datas.email = decryptEmail(emailEncrypted);
      res.status(200).json({ datas });
    })
    .catch((error) => res.status(500).json({ message: err.message }));
};

// Find a single User with an username
exports.readByName = async (req, res) => {
  user
    .findOne({
      include: {
        all: true,
      },
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User Not Found.");
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

// Retrieve all Users from the database.
exports.readAll = (req, res) => {
  user
    .findAll()
    .then((users) => {
      if (users.length <= 0) {
        return res.status(404).send("Users not found");
      }
      res.status(200).json(users);
    })
    .catch((error) => res.status(500).json({ error }));
};

// Update password
exports.update = async (req, res) => {
  user
    .findOne({
      where: { id: req.auth.userID },
    })
    .then((user) => {
      // if not, respond with a 404 code
      if (!user) {
        return res.status(404).send("User not found");
      }

      // If user change password
      // Check if the old password is valid
      bcrypt.compare(req.body.password, user.password).then((validPass) => {
        if (!validPass) {
          return res
            .status(401)
            .send("The old password does not match the account password");
        }

        if (req.body.newPassword == req.body.password) {
          return res
            .status(401)
            .send(
              "Old password and new password can't be the same. You need to change the new password !"
            );
        }

        // Then, hash the new Password
        bcrypt
          .hash(req.body.newPassword, 10)
          .then((newPassword) => {
            user.update(
              { password: newPassword },
              { where: { id: req.auth.userID } }
            );
            console.log(req.body.newPassword);
            res.send({ message: "Password update successfully!" });
          })
          .catch((err) => {
            res
              .status(500)
              .send(err, { message: "Could not update password user" });
          });
      });

      // If user change email
      if (req.body.newEmail) {
        console.log(req.body.newEmail);
        if (!req.body.email) {
          return res.status(401).send("Old email is required !");
        }

        // Check new email validation
        if (!validateEmail(req.body.newEmail)) {
          return res
            .status(400)
            .json({ error: "The specified email is invalid." });
        }
      }
      const emailAlreadyRegistered = req.body.newEmail;
      // Encrypt email
      var emailEncrypted = encrypted(emailAlreadyRegistered);
      encrypted(emailAlreadyRegistered);
      user.update(
        { email: emailEncrypted },
        { where: { id: req.auth.userID } }
      );
      res.send({ message: "Email update successfully!" });
    })
    .catch((error) => res.status(500).json(console.log(error)));
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  user
    .destroy({
      where: {
        id: req.auth.userID,
      },
    })
    .then((userId) => {
      if (!userId) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      return res.status(200).json({
        message: "User Deleted successfully",
      });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

// Export user info
exports.exportUser = async (req, res) => {
  user
    .findOne({
      include: [
        { association: "comments" },
        { association: "posts" },
        { association: "moderators" },
        { association: "likePosts" },
        { association: "userReported" },
        { association: "postReport" },
        { association: "replies" },
        { association: "messageToUserId" },
      ],
      where: {
        id: req.auth.userID,
      },
    })
    .then((datas) => {
      var emailEncrypted = datas.email;
      datas.email = decryptEmail(emailEncrypted);
      const dataFile = path.join(
        __dirname,
        "export",
        `datasUser.${req.auth.userID}.txt`
      );
      const file = JSON.stringify(datas, null, 4);
      fs.writeFileSync(dataFile, file);
      return res.status(200).send(file);
    })
    .catch((error) => res.status(500).json(console.log(error)));
};
