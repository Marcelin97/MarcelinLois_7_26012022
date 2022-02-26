const { user } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CryptoJS = require("crypto-js");
// Import the filesystem module
const fs = require("fs");
const path = require("path");
const { Console } = require("console");

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

  // Check email validation
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ error: "L'email indiqué est invalide." });
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
    .then((data) => {
      var emailEncrypted = data.email;
      data.email = decryptEmail(emailEncrypted);
      res.status(200).json({
        status: 200,
        data,
      });
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
      res.status(200).send({
        status: 200,
        user,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
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
      res.status(200).json({
        status: 200,
        data: users,
      });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

// Update password
exports.update = async (req, res) => {
  user
    .findOne({
      where: { id: req.auth.userID },
    })
    .then(async (user) => {
      // if not, respond with a 404 code
      if (!user) {
        return res.status(404).send("User not found");
      }

      // verification of req.body with Joi

      const { password, newPassword, newEmail } = req.body;
      // 1 if password changed
      // do the change
      if (newPassword != undefined) {
        // do 1
        if (newPassword == password) {
          return res
            .status(401)
            .send(
              "Old password and new password can't be the same. You need to change the new password !"
            );
        };
        

        // try {
        //   // Check if the old password is valid
        //   const result = bcrypt.compare(password, user.password);
        //   if (!result) {
        //     return res.status(403).json({ error: "Incorrect password !" });
        //   };
          try {
            // Hash the new password
            const hashPass = await bcrypt.hash(newPassword, 10);

            // 3 send back modified user
            user.update(
              { password: hashPass },
              { where: { id: req.auth.userID } }
            );
          } catch (err) {
            console.log(err);
          }
        // } catch (error) {
        //   console.log(error)
        // }
      }

      // 2 if email change
      // do the change
      if (newEmail != undefined) {
        // do 2
        if (newEmail) {
          // console.log(newEmail);
          // Encrypt email
          var emailEncrypted = encrypted(newEmail);
        }
      }

      // 3 send back modified user
      user.update(
        { email: emailEncrypted },
        { where: { id: req.auth.userID } }
      );

      // do 3
      res.status(200).json({
        status: 200,
        data: user,
      });

    })
    .catch((error) =>
      res.status(500).json({
        error: error.name,
        message: error.message,
      })
    );
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
      return res.status(204).json({
        status: 204,
        message: "User Deleted successfully",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
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
      return res.status(200).send({
        status: 200,
        file,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error.name,
        message: error.message,
      })
    );
};
